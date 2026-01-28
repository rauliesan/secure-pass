package com.daw.error;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class MiError {
	
	private HttpStatus estado;
	
	@JsonFormat(shape = Shape.STRING, pattern = "dd/MM/yyyy hh:mm:ss")
	private LocalDateTime fecha;

	private String ipCliente;
	
	private String mensaje;
	
	
	public HttpStatus getEstado() {
		return estado;
	}
	
	public void setEstado(HttpStatus estado) {
		this.estado = estado;
	}
	
	public LocalDateTime getFecha() {
		return fecha;
	}
	
	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}
	
	public String getMensaje() {
		return mensaje;
	}
	
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	
	public String getIpCliente() {
		return ipCliente;
	}
	
	public void setIpCliente(String ipCliente) {
		this.ipCliente = ipCliente;
	}
	
	
}
