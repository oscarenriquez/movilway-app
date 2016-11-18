package movilway.dao.domain;

import java.io.Serializable;

@SuppressWarnings("serial")
public class RegionProvincia implements Serializable {

	private Long regionprovinciaId;
	private Estado estado;
	private Pais pais;
	private Provincia provincia;
	private String descripcion;
	private String abrev;

	public Long getRegionprovinciaId() {
		return this.regionprovinciaId;
	}

	public void setRegionprovinciaId(Long regionprovinciaId) {
		this.regionprovinciaId = regionprovinciaId;
	}

	public Estado getEstado() {
		return this.estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}

	public Pais getPais() {
		return this.pais;
	}

	public void setPais(Pais pais) {
		this.pais = pais;
	}

	public Provincia getProvincia() {
		return this.provincia;
	}

	public void setProvincia(Provincia provincia) {
		this.provincia = provincia;
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

}
