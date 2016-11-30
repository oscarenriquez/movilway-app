package movilway.dao.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@SuppressWarnings("serial")
public class Provincia implements Serializable {

	private Long provinciaId;
	private Estado estado;
	private Pais pais;
	private String descripcion;
	private String abrev;
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

	public Set<RegionProvincia> getRegionProvincias() {
		return this.regionProvincias;
	}

	public void setRegionProvincias(Set<RegionProvincia> regionProvincias) {
		this.regionProvincias = regionProvincias;
	}

	public boolean addRegionProvincia(RegionProvincia e) {
		if(regionProvincias == null) {
			regionProvincias = new HashSet<>();
		}
		e.setProvincia(this);
		e.setEstado(this.getEstado());
		e.setPais(this.getPais());
		return regionProvincias.add(e);
	}

	public boolean removeRegionProvincia(RegionProvincia o) {
		o.setProvincia(null);
		o.setEstado(null);
		o.setPais(null);
		return regionProvincias.remove(o);
	}

}
