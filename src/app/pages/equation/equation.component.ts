import { HostListener, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { MathContent } from "src/app/modules/math/math-content";
import functionPlot, {
  FunctionPlotOptions,
  FunctionPlotDatum,
} from "function-plot";

@Component({
  selector: "app-equation",
  templateUrl: "./equation.component.html",
  styleUrls: ["./equation.component.css"],
})
export class EquationComponent implements OnInit {
  equationData: any;

  mathLatex: MathContent = {
    latex: "",
  };

  isLoading = true;

  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    this.plotGraph();
  }

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {}

  getEquationByUrlLink(urlLink: string): void {
    this.apiService.getEquationByUrlLink(urlLink).subscribe((data) => {
      this.equationData = data;

      // Check if equationData.plot_data.range exists and is an array
      if (
        this.equationData.plot_data &&
        Array.isArray(this.equationData.plot_data.range)
      ) {
        try {
          // Parse and convert each element of the range array to a number
          this.equationData.plot_data.range =
            this.equationData.plot_data.range.map((value: string) => {
              return eval(value);
            });
        } catch (error) {
          console.error("Error parsing or evaluating range:", error);
        }
      }

      this.plotGraph();
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const urlLink = params["url_link"];
      this.getEquationByUrlLink(urlLink);
      this.isLoading = false;
    });
  }

  computeYScale(width: any, height: any, xScale: any) {
    const xDiff = xScale[1] - xScale[0];
    const yDiff = (height * xDiff) / width;
    return [-yDiff / 2, yDiff / 2];
  }

  public plotGraph() {
    const container = document.querySelector(
      "#function-plot-container",
    ) as HTMLElement;

    if (container) {
      container.innerHTML = ""; // Clear previous content

      // Get the width of the container
      const containerWidth = container.offsetWidth;

      // Calculate the height
      const height = containerWidth * 0.6;

      // Clear previous content
      container.innerHTML = "";

      const xScale = [-10, 10];

      const options: FunctionPlotOptions = {
        width: containerWidth,
        height: height,
        xDomain: xScale,
        yDomain: this.computeYScale(containerWidth, height, xScale),

        target: container,
        data: [this.equationData.plot_data],
      };

      // Create the function plot
      functionPlot(options);
    } else {
      console.error("Container not found!");
    }
  }
}
