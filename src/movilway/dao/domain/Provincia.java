package movilway.dao.domain;

import java.io.Serializable;
import java.util.Set;

@SuppressWarnings("serial")
public class Provincia implements Serializable {

	private Long provinciaId;
	private Estado estado;
	private Pais pais;
	private String descripcion;
	private String abrev;
	private Set<PuntoVenta> puntoVentas;
	private Set<RegionProvincia> regionProvincias;

	public Long getId() {
		return this.provinciaId;
	}
	
	public Long getProvinciaId() {
		return this.provinciaId;
	}

	public void setProvinciaId(Long provinciaId) {
		this.provinciaId = provinciaId;
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

	public Set<PuntoVenta> getPuntoVentas() {
		return this.puntoVentas;
	}

	public void setPuntoVentas(Set<PuntoVenta> puntoVentas) {
		this.puntoVentas = puntoVentas;
	}

	public Set<RegionProvincia> getRegionProvincias() {
		return this.regionProvincias;
	}

	public void setRegionProvincias(Set<RegionProvincia> regionProvincias) {
		this.regionProvincias = regionProvincias;
	}

}
