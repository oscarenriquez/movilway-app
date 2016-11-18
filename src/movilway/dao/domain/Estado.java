package movilway.dao.domain;

import java.io.Serializable;
import java.util.Set;

@SuppressWarnings("serial")
public class Estado implements Serializable {

	private Long estadoId;
	private Pais pais;
	private String descripcion;
	private String abrev;
	private Set<PuntoVenta> puntoVentas;
	private Set<Provincia> provincias;
	private Set<RegionProvincia> regionProvincias;	

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

	public Set<PuntoVenta> getPuntoVentas() {
		return this.puntoVentas;
	}

	public void setPuntoVentas(Set<PuntoVenta> puntoVentas) {
		this.puntoVentas = puntoVentas;
	}

	public Set<Provincia> getProvincias() {
		return this.provincias;
	}

	public void setProvincias(Set<Provincia> provincias) {
		this.provincias = provincias;
	}

	public Set<RegionProvincia> getRegionProvincias() {
		return this.regionProvincias;
	}

	public void setRegionProvincias(Set<RegionProvincia> regionProvincias) {
		this.regionProvincias = regionProvincias;
	}

}
