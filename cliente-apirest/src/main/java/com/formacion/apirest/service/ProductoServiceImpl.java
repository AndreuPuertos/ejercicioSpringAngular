package com.formacion.apirest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.formacion.apirest.entity.Producto;
import com.formacion.apirest.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService{
	
	@Autowired
	private ProductoRepository productoRepository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Producto> mostrarProducto() {
		return (List<Producto>) productoRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Producto buscarProducto(long id) {
		return productoRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Producto guardarProducto(Producto producto) {
		return productoRepository.save(producto);
	}

	@Override
	@Transactional
	public Producto borrarProducto(long id) {
		Producto productoBorrado = buscarProducto(id);
		productoRepository.deleteById(id);
		
		return productoBorrado;
		
		
	}
	
	

}
