import { Component, OnInit, OnDestroy } from '@angular/core';
import { InspectionService } from 'src/app/services/inspection.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
//import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-b';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit, OnDestroy {

  inspectionLis$!:Observable<any[]>;
  inspectionTypesList$!:Observable<any[]>;
  inspectionTypesList:any=[];
  public suscripton:any = Subscription;

  requesDelete:any=[];

  inspectionTypesMap:Map<number, string> = new Map()

  constructor(
    private service:InspectionService,
    private MatDialog: MatDialog,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
   this.inspectionLis$ = this.service.getInspecytion();
   console.log('Lista',this.inspectionLis$);
   this.inspectionTypesList$ = this.service.getInspectionTypesList();
   this.refreshInspectionTypesMap();
  }

    modaltitle:string ='';
    activateAddInspectionComponent: boolean = false;
    inspection: any;


  ngOnDestroy(): void {
    this.suscripton.unsubscribe();
  }

  modalClose(){
    this.activateAddInspectionComponent = false;
    this.inspectionLis$ = this.service.getInspecytion();
  }
  modalEdit(item:any){
    this.inspection = item;
    this.modaltitle= "Editar Inspección";
    this.activateAddInspectionComponent = true;
  }
  modalAdd(){
    this.inspection = {
      id: 0,
      status: null,
      comments: null,
      inspectionTypeId:null
    }
    this.modaltitle = "Añadir Inspección";
    this.activateAddInspectionComponent = true;
  }


  refreshInspectionTypesMap() {
    this.service.getInspectionTypesList().subscribe(data => {
      this.inspectionTypesList = data;
      console.log(`data`,this.inspectionTypesList );
      for(let i = 0; i < data.length; i++)
      {
        this.inspectionTypesMap.set(this.inspectionTypesList[i].id, this.inspectionTypesList[i].inspectionName);
      }
    })
  }

  delete(id: any){
   // console.log('eliminar item');
    if(confirm(`Esta seguro de eliminar la Inspección ${id}`)){
      this.service.deleteinspection(id).subscribe(res =>{
        console.log('itemmmm', res);
       // this.toastr.success('Inspección Eliminado correctamente');
      this.inspectionLis$ = this.service.getInspecytion();
      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      },4000);

      });

    }
  }



}
