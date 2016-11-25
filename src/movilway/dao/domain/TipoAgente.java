package movilway.dao.domain;

import java.io.Serializable;
import java.util.Comparator;

@SuppressWarnings("serial")
public class TipoAgente implements Serializable, Comparable<TipoAgente> {

	private Long tipoagenteId;
	private Long empresaId;
	private String descripcion;
	private Boolean esAdmin;
	private Boolean estatus;	

	public static final Comparator<TipoAgente> BY_DESCRIPTION = new Comparator<TipoAgente>() {
		@Override
		public int compare(TipoAgente o1, TipoAgente o2) {	
			return o1.descripcion.compareTo(o2.descripcion);
		}
	};
	
	public Long getId() {
		return this.tipoagenteId;
	}
	
	public Long getTipoagenteId() {
		return this.tipoagenteId;
	}

	public void setTipoagenteId(Long tipoagenteId) {
		this.tipoagenteId = tipoagenteId;
	}

	public Long getEmpresaId() {
		return this.empresaId;
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

	public Boolean getEsAdmin() {
		return this.esAdmin;
	}

	public void setEsAdmin(Boolean esAdmin) {
		this.esAdmin = esAdmin;
	}

	public Boolean getEstatus() {
		return this.estatus;
	}

	public void setEstatus(Boolean estatus) {
		this.estatus = estatus;
	}	

	@Override
	public int compareTo(TipoAgente o) {
		if(this.tipoagenteId > o.tipoagenteId)
			return 1;
					
		if(this.tipoagenteId < o.tipoagenteId)
			return -1;
		
		return 0;
	}
}
