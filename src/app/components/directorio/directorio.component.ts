import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {
  public URI_DIRECTORIO: string = 'http://localhost:8080/api/directorio';
  public URI_FACTURA: string = 'http://localhost:8080/api/facturas';
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
    this.http.get(this.URI_DIRECTORIO).subscribe(
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
      this.http.delete(this.URI_DIRECTORIO + '/del/' + id).subscribe(
        resp => { 
          this.toastr.success( JSON.stringify(resp), 'Mensaje del sistema' );
          console.log(resp);
          this.mostrarDirectorio();
          this.mostrarFacturas = false;
        },
        err => {
          this.toastr.error( err.error.message, 'Mensaje del sistema' );
          console.log(err);
        }
      );
    }
  }

  public verFacturas(id: string){
    this.http.get(this.URI_DIRECTORIO + '/find/' +id).subscribe(
      resp => { 
        this.identificacion = id;
        this.listaFacturas = resp;
        console.log(resp); 
        this.mostrarFacturas = true;
      },
      err => {
        console.log(err);
      }
    );
  }


  public nuevoUsuario(): void {
    this.http.post(this.URI_DIRECTORIO, {
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
        this.toastr.error( err.error.message, 'Mensaje del sistema' );
        console.log(err);
      }
    );
  }

  public nuevaFactura(): void {
    this.http.post(this.URI_FACTURA, {
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
      this.toastr.error( err.error.message, 'Mensaje del sistema' );
      console.log(err);
    }
  );
  }

}
