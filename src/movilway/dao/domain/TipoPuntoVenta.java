package movilway.dao.domain;

import java.io.Serializable;
import java.util.Comparator;

@SuppressWarnings("serial")
public class TipoPuntoVenta implements Serializable, Comparable<TipoPuntoVenta> {
	
	private Long tipopuntoventaId;
	private Long empresaId;
	private String descripcion;
	private Boolean estatus;
	
	public static final Comparator<TipoPuntoVenta> BY_DESCRIPTION = new Comparator<TipoPuntoVenta>() {
		@Override
		public int compare(TipoPuntoVenta o1, TipoPuntoVenta o2) {	
			return o1.descripcion.compareTo(o2.descripcion);
		}
	};
	
	public Long getId() {
		return this.tipopuntoventaId;
	}
	
	public Long getTipopuntoventaId() {
		return this.tipopuntoventaId;
	}

	public void setTipopuntoventaId(Long tipopuntoventaId) {
		this.tipopuntoventaId = tipopuntoventaId;
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
	public int compareTo(TipoPuntoVenta o) {
		if(this.tipopuntoventaId > o.tipopuntoventaId)
			return 1;
					
		if(this.tipopuntoventaId < o.tipopuntoventaId)
			return -1;
		
		return 0;
	}

}
