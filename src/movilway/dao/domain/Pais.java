package movilway.dao.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@SuppressWarnings("serial")
public class Pais implements Serializable {

	private Long paisId;
	private Long empresaId;
	private String descripcion;
	private String abrev;
	private Set<Estado> estados;

	public Long getId() {
		return this.paisId;
	}
	
	public Long getPaisId() {
		return this.paisId;
	}

	public void setPaisId(Long paisId) {
		this.paisId = paisId;
	}

	public Long getEmpresaId() {
		return empresaId;
	}

	public void setEmpresaId(Long empresaId) {
		this.empresaId = empresaId;
	}

	public String getDescripcion() {
		return this.descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getAbrev() {
		return this.abrev;
	}

	public void setAbrev(String abrev) {
		this.abrev = abrev;
	}

	public Set<Estado> getEstados() {
		return this.estados;
	}

	public void setEstados(Set<Estado> estados) {
		this.estados = estados;
	}
	
	public boolean addEstado(Estado e) {
		if(estados == null){
			estados = new HashSet<>();
		}
		e.setPais(this);
		return estados.add(e);
	}

	public boolean removeEstado(Estado e) {
		e.setPais(null);
		return estados.remove(e);
	}

}
