package movilway.dao.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@SuppressWarnings("serial")
public class Estado implements Serializable {

	private Long estadoId;
	private Pais pais;
	private String descripcion;
	private String abrev;	
	private Set<Provincia> provincias;	

	public Long getId() {
		return this.estadoId;
	}
	
	public Long getEstadoId() {
		return this.estadoId;
	}

	public void setEstadoId(Long estadoId) {
		this.estadoId = estadoId;
	}

	public Pais getPais() {
		return this.pais;
	}

	public void setPais(Pais pais) {
		this.pais = pais;
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
	
	public Set<Provincia> getProvincias() {
		return this.provincias;
	}

	public void setProvincias(Set<Provincia> provincias) {
		this.provincias = provincias;
	}

	public boolean addProvincia(Provincia e) {
		if(provincias == null) {
			provincias = new HashSet<>();
		}
		e.setEstado(this);
		e.setPais(this.getPais());
		return provincias.add(e);
	}

	public boolean removeProvincia(Provincia e) {
		e.setEstado(null);
		e.setPais(null);
		return provincias.remove(e);
	}

}
