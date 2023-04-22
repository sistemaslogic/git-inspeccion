import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {InspectionService} from 'src/app/services/inspection.service';
@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css']
})
export class AddEditInspectionComponent implements OnInit {

  inspectionLis$!:Observable<any[]>;
  inspectionTypesList$!:Observable<any[]>;
  inspectionTypesList:any=[];
  statusList$!:Observable<any[]>;

  constructor(private service: InspectionService) { }

  @Input() inspection: any;
  id: number = 0;
  status: string ="";
  comments: string ="";
  inspectionTypesId!: number;

  ngOnInit(): void {
    console.log('muestra', this.inspection);
    this.id = this.inspection.id;
    this.status = this.inspection.status;
    this.comments = this.inspection.comments;
    this.inspectionTypesId = this.inspection.inspectionTypeId;
    this.statusList$ = this.service.getStatusLis();
    this.inspectionLis$ = this.service.getInspecytion();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
  }

}
