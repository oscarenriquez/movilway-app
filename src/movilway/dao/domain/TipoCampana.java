package movilway.dao.domain;

import java.io.Serializable;
import java.util.Comparator;

@SuppressWarnings("serial")
public class TipoCampana implements Serializable, Comparable<TipoCampana> {

	public static final Long VENTA = 1L;
	public static final Long NOTIFICACION = 2L;
	private Long tipocampanaId;
	private Long empresaId;
	private String descripcion;
	private Boolean estatus;	

	public static final Comparator<TipoCampana> BY_DESCRIPTION = new Comparator<TipoCampana>() {
		@Override
		public int compare(TipoCampana o1, TipoCampana o2) {	
			return o1.descripcion.compareTo(o2.descripcion);
		}
	};		
	
	public Long getId() {
		return this.tipocampanaId;
	}
	
	public Long getTipocampanaId() {
		return this.tipocampanaId;
	}

	public void setTipocampanaId(Long tipocampanaId) {
		this.tipocampanaId = tipocampanaId;
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

	public Boolean getEstatus() {
		return this.estatus;
	}

	public void setEstatus(Boolean estatus) {
		this.estatus = estatus;
	}
	
	@Override
	public int compareTo(TipoCampana o) {
		if(this.tipocampanaId > o.tipocampanaId)
			return 1;
					
		if(this.tipocampanaId < o.tipocampanaId)
			return -1;
		
		return 0;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
		result = prime * result + ((empresaId == null) ? 0 : empresaId.hashCode());
		result = prime * result + ((estatus == null) ? 0 : estatus.hashCode());
		result = prime * result + ((tipocampanaId == null) ? 0 : tipocampanaId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TipoCampana other = (TipoCampana) obj;
		if (descripcion == null) {
			if (other.descripcion != null)
				return false;
		} else if (!descripcion.equals(other.descripcion))
			return false;
		if (empresaId == null) {
			if (other.empresaId != null)
				return false;
		} else if (!empresaId.equals(other.empresaId))
			return false;
		if (estatus == null) {
			if (other.estatus != null)
				return false;
		} else if (!estatus.equals(other.estatus))
			return false;
		if (tipocampanaId == null) {
			if (other.tipocampanaId != null)
				return false;
		} else if (!tipocampanaId.equals(other.tipocampanaId))
			return false;
		return true;
	}
	
	
}
