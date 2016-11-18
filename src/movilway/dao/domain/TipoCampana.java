package movilway.dao.domain;

import java.io.Serializable;
import java.util.Comparator;

@SuppressWarnings("serial")
public class TipoCampana implements Serializable, Comparable<TipoCampana> {

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
}
