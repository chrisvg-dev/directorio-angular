import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {
  public URI: string = environment.apiURL;
  public directorio : any = [];
  public listaFacturas: any = [];
  public mostrarFacturas : boolean = false;
  public identificacion: string = '';

  public nombre: string = '';
  public apellidoPaterno: string = '';
  public apellidoMaterno: string = '';
  public ident: string = '';

  public monto: number = 0.0;
  public idUsuario: string = "";

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.mostrarDirectorio();
  }

  public mostrarDirectorio(): void {
    this.http.get(this.URI+"/api/directorio").subscribe(
      resp => { 
        console.log(resp); 
        this.directorio = resp;
      },
      err => {
        console.log(err);
      }
    );
  }

  public eliminar(id: string){
    if (confirm('Desea eliminar esta registro?')){
      this.http.delete(this.URI +'/api/directorio/del/' + id).subscribe(
        resp => { 
          this.toastr.success( JSON.stringify(resp), 'Mensaje del sistema' );
          console.log(resp);
          this.mostrarDirectorio();
          this.mostrarFacturas = false;
        },
        err => {
          this.toastr.error( err.error.msg, 'Mensaje del sistema' );
          console.log(err);
        }
      );
    }
  }

  public verFacturas(id: string){
    this.http.get(this.URI +'/api/directorio/find/' +id).subscribe(
      resp => { 
        this.identificacion = id;
        this.listaFacturas = resp;
        console.log(resp); 
        this.mostrarFacturas = true;
      },
      err => {
        this.toastr.error( err.error, 'Mensaje del sistema' );
        console.log(err);
      }
    );
  }


  public nuevoUsuario(): void {
    this.http.post(this.URI+"/api/directorio", {
        nombre: this.nombre, 
        apellidoPaterno: this.apellidoPaterno, 
        apellidoMaterno: this.apellidoMaterno, 
        identificacion: this.ident}
      ).subscribe(
      resp => { 
        this.toastr.success( JSON.stringify(resp), 'Mensaje del sistema' );
        console.log(resp);
        this.mostrarDirectorio();

        this.nombre = '';
        this.apellidoPaterno = '';
        this.apellidoMaterno = '';
        this.ident = '';
      },
      err => {
        this.toastr.error( err.error.msg, 'Mensaje del sistema' );
        console.log(err);
      }
    );
  }

  public nuevaFactura(): void {
    this.http.post(this.URI+"/api/facturas", {
      monto: this.monto, 
      identificacion: this.idUsuario
    }
    ).subscribe(
    resp => { 
      this.toastr.success( JSON.stringify(resp), 'Mensaje del sistema' );
      console.log(resp);
      this.mostrarDirectorio();

      this.monto = 0.0;
      this.idUsuario = '';
    },
    err => {
      this.toastr.error( err.error.msg, 'Mensaje del sistema' );
      console.log(err);
    }
  );
  }

}
