package movilway.dao.domain;

import java.io.Serializable;
import java.util.Set;

@SuppressWarnings("serial")
public class Pais implements Serializable {

	private Long paisId;
	private String descripcion;
	private String abrev;
	private Set<Estado> estados;
	private Set<Provincia> provincias;
	private Set<RegionProvincia> regionProvincias;
	private Set<PuntoVenta> puntoVentas;

	public Long getPaisId() {
		return this.paisId;
	}

	public void setPaisId(Long paisId) {
		this.paisId = paisId;
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

	public Set<PuntoVenta> getPuntoVentas() {
		return this.puntoVentas;
	}

	public void setPuntoVentas(Set<PuntoVenta> puntoVentas) {
		this.puntoVentas = puntoVentas;
	}

}
