import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../cliente/interfaces/region.interface';
import { UsuarioService } from '../usuario/usuario.service';
import { Producto } from './interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase:string="http://localhost:8080/api/productos";

  constructor(private http:HttpClient, private servicioUsuario:UsuarioService) { }

  httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  addAuthorizationHeader():any{
    let token = this.servicioUsuario.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer '+token)
    }

    return this.httpHeaders;
  }


  //metodo para consumir api get
  mostrarProducto():Observable<Producto[]>{
    const url = this.urlBase
    return this.http.get<Producto[]>(url);
  }
  //metodo para enviar datos a api post
  guardarProducto(producto:Producto):Observable<Producto>{
    const url = this.urlBase;
    return this.http.post<Producto>(url, producto, {headers: this.addAuthorizationHeader() });
  }

  //buscar producto por id
  getProducto(id:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.urlBase}/${id}`,{headers: this.addAuthorizationHeader() });
  }

  //actualizar producto
  update(producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.urlBase}/${producto.id}`,producto, {headers: this.addAuthorizationHeader() });
  }
  //eliminar producto
  delete(id:number):Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlBase}/${id}`,{headers: this.addAuthorizationHeader() });
  }

}
