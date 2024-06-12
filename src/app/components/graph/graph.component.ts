import {
  Component,
  ElementRef,
  AfterViewInit,
  OnInit,
  ViewChild,
  HostListener,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import functionPlot, {
  FunctionPlotOptions,
  FunctionPlotDatum,
} from "function-plot";
import { MatSelectionList, MatListOption } from "@angular/material/list";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"],
})
export class GraphComponent implements AfterViewInit, OnInit {
  gridEnabled = false;
  graphTypes = ["interval", "polyline", "scatter"];
  equations: FunctionPlotDatum[] = []; // Variable to store equations
  equationForm: FormGroup;

  @ViewChild("functions") functions!: MatSelectionList;

  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    // Call the function here when the window is resized
    this.plotGraph();
  }

  constructor(private formBuilder: FormBuilder) {
    this.equationForm = this.formBuilder.group({
      fn: [""],
      nSamples: [""],
      graphType: ["interval"],
      equationType: ["linear"],
      x: [""],
      y: [""],
      polar: [""],
      rangeStart: [""],
      rangeEnd: [""],
    });
  }

  ngOnInit() {
    // Subscribe to changes in equationType
    this.equationForm
      .get("equationType")
      ?.valueChanges.subscribe((equationType) => {
        if (equationType === "parametric" || equationType === "polar") {
          // Set graphType to 'polyline' for parametric or polar equations
          this.equationForm.get("graphType")?.setValue("polyline");
        } else {
          // Set graphType to 'interval' for other equation types
          this.equationForm.get("graphType")?.setValue("interval");
        }
      });
  }

  saveEquation() {
    const equationGraphType = this.equationForm.value.graphType;
    const equationSamples = this.equationForm.value.nSamples;

    const rangeStartInput = this.equationForm.value.rangeStart;
    const rangeEndInput = this.equationForm.value.rangeEnd;

    // Initialize equationData with graphType
    const equationData: FunctionPlotDatum = {
      graphType: equationGraphType.trim(),
    };

    if (rangeStartInput && rangeEndInput) {
      // Check if both range inputs have values
      let rangeStart = parseFloat(rangeStartInput);
      let rangeEnd = parseFloat(rangeEndInput);

      // Check if rangeStart and rangeEnd are valid numbers
      if (!isNaN(rangeStart) && !isNaN(rangeEnd)) {
        // Check if the inputs contain "pi" and multiply accordingly
        if (rangeStartInput.includes("* pi")) {
          rangeStart = rangeStart * Math.PI;
        }
        if (rangeEndInput.includes("* pi")) {
          rangeEnd = rangeEnd * Math.PI;
        }

        // Create a range array
        equationData.range = [rangeStart, rangeEnd];
      } else {
        // Handle invalid input (e.g., display an error message)
        // You can add your error handling logic here
      }
    }

    const equationType = this.equationForm.value.equationType;

    if (equationType === "linear") {
      const equationFn = this.equationForm.value.fn;
      if (equationFn && equationFn.trim() !== "") {
        equationData.fn = equationFn.trim();

        if (equationSamples && equationSamples.trim() !== "") {
          equationData.nSamples = equationSamples.trim();
        }

        this.equations.push(equationData);
      }
    } else if (equationType === "parametric") {
      const x = this.equationForm.value.x;
      const y = this.equationForm.value.y;
      if (x && x.trim() !== "" && y && y.trim() !== "") {
        equationData.x = x.trim();
        equationData.y = y.trim();
        equationData.fnType = equationType; // Set fnType to 'parametric'

        if (equationSamples && equationSamples.trim() !== "") {
          equationData.nSamples = equationSamples.trim();
        }

        this.equations.push(equationData);
      }
    } else if (equationType === "polar") {
      const polar = this.equationForm.value.polar;
      if (polar && polar.trim() !== "") {
        equationData.r = polar.trim();
        equationData.fnType = equationType; // Set fnType to 'polar'

        if (equationSamples && equationSamples.trim() !== "") {
          equationData.nSamples = equationSamples.trim();
        }

        this.equations.push(equationData);
      }
    }

    // Reset the form and plot the graph
    this.equationForm.reset();
    this.plotGraph();
  }

  ngAfterViewInit() {
    // Initially, plot an empty graph
    this.plotGraph();

    if (this.functions) {
      this.functions.selectionChange.subscribe(() => {
        this.logSelectedFunctions();
      });
    }
  }

  computeYScale(width: any, height: any, xScale: any) {
    const xDiff = xScale[1] - xScale[0];
    const yDiff = (height * xDiff) / width;
    return [-yDiff / 2, yDiff / 2];
  }

  toggleGrid() {
    // Toggle the gridEnabled variable
    this.gridEnabled = !this.gridEnabled;

    // Call plotGraph to update the graph with the new grid setting
    this.plotGraph();
  }

  public plotGraph() {
    const container = document.querySelector(
      "#function-plot-container",
    ) as HTMLElement;

    if (container) {
      container.innerHTML = ""; // Clear previous content

      // Get the width of the container
      const containerWidth = container.offsetWidth;

      // Calculate the height as 0.6 of the width
      const height = containerWidth * 0.6;

      // Clear previous content
      container.innerHTML = "";

      // desired xDomain values
      const xScale = [-10, 10];

      const options: FunctionPlotOptions = {
        width: containerWidth,
        height: height,
        xDomain: xScale,
        yDomain: this.computeYScale(containerWidth, height, xScale),

        target: container,
        grid: this.gridEnabled,
        data: this.equations, // Use the equations variable
      };

      // Create the function plot
      functionPlot(options);
    } else {
      console.error("Container not found!"); // Handle the error appropriately
    }
  }

  deleteSelectedEquations() {
    const selectedOptions = this.functions.selectedOptions.selected;
    const selectedValues = selectedOptions.map((option) => option.value);

    // Filter equations to remove those with matching values
    this.equations = this.equations.filter((equation) => {
      const equationType = equation.fnType;

      // Check for the equation type and delete accordingly
      if (equationType === "linear" && selectedValues.includes(equation.fn)) {
        return false; // Delete linear equation with matching fn
      } else if (
        equationType === "parametric" &&
        selectedValues.some(
          (value) => value === this.getEquationValue(equation),
        )
      ) {
        return false; // Delete parametric equations with matching x and y
      } else if (
        equationType === "polar" &&
        selectedValues.includes(equation.r)
      ) {
        return false; // Delete polar equation with matching r
      }

      return true; // Keep equations that don't match
    });

    // Clear the selection by setting selected to false for each option
    selectedOptions.forEach((option) =>
      (option as MatListOption)._setSelected(false),
    );

    this.plotGraph();
  }

  getEquationValue(equation: FunctionPlotDatum): string {
    if (equation.fnType === "parametric") {
      return `${equation.x} ${equation.y}`;
    } else if (equation.fnType === "polar") {
      // Set a different value for polar equations if needed
      return `${equation.r}`;
    } else {
      return `${equation.fn}`;
    }
  }
  logSelectedFunctions() {
    const selectedOptions = this.functions.selectedOptions.selected;
    const selectedFunctions = selectedOptions.map((option) => option.value);
    console.log("Selected Functions:", selectedFunctions);
  }
}
