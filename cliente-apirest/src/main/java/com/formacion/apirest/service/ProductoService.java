package com.formacion.apirest.service;

import java.util.List;

import com.formacion.apirest.entity.Producto;

public interface ProductoService {
	
	
	Producto buscarProducto(long id);

	List<Producto> mostrarProducto();

	Producto guardarProducto(Producto producto);

	Producto borrarProducto(long id);

}
