import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Region } from 'src/app/cliente/interfaces/region.interface';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: []
})
export class ProductoFormComponent implements OnInit {


  productoNew:Producto = {
    id: 0,
    nombre: '',
  };

  regiones!:Region[];

  public id!:string|null;

  constructor( private servicio:ProductoService,
               private router:Router,
               private usuarioService:UsuarioService,
               private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {

    if(this.usuarioService.token == ""){
      swal("No esta autenticado","usuario no autenticado","info");
      this.router.navigate(['/login'])
    }else{

      this.activateRoute.paramMap.subscribe(
        params => {
         this.id =  params.get('id');
         if(this.id){
          this.servicio.getProducto( parseInt(this.id) ).subscribe(
            resp => {this.productoNew = resp }
          );
         }
        }
      );


    }

  }
  guardarProducto():void{

    this.servicio.guardarProducto( this.productoNew ).subscribe(
      resp=> {
        console.log("esto responde",resp);
        swal("Nuevo Producto",`${this.productoNew.nombre} creado con éxito`,'success');
        this.router.navigate(['']);
      },
      error=> {
        console.log("error: ",error);
        swal("Error",`error al crear producto ${error.status}`,'error');
      }

    )
  }



  editarProducto():void{
    console.log("esto edita",this.productoNew);
    this.servicio.update( this.productoNew ).subscribe(
      resp=> {
        console.log("esto responde",resp);
        swal("Producto editado",`${this.productoNew.nombre} editado con éxito`,'success');
        this.router.navigate(['/producto']);
      },
      error=> {
        console.log("error: ",error);
        swal("Error",`error al editar producto ${error.status}`,'error');
      }

    )
  }

}
