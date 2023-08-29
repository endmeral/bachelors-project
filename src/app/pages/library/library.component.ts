import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Equation } from './equations';
import { equations } from './equations';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements AfterViewInit {
  equations: Equation[] = equations;

  equationsDataSource: MatTableDataSource<Equation> = new MatTableDataSource<Equation>(this.equations);
  displayedColumns: string[] = ['title', 'equation', 'description'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  ngAfterViewInit(): void {
    this.equationsDataSource.sort = this.sort;
    this.equationsDataSource.paginator = this.paginator;
  }
}
