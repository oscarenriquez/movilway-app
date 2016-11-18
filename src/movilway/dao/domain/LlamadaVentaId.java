package movilway.dao.domain;

import java.io.Serializable;

@SuppressWarnings("serial")
public class LlamadaVentaId implements Serializable {

	private Long detalleId;
	private Long corrLlamada;

	public LlamadaVentaId() {
	}

	public LlamadaVentaId(Long detalleId, Long corrLlamada) {
		this.detalleId = detalleId;
		this.corrLlamada = corrLlamada;
	}

	public Long getDetalleId() {
		return this.detalleId;
	}

	public void setDetalleId(Long detalleId) {
		this.detalleId = detalleId;
	}

	public Long getCorrLlamada() {
		return this.corrLlamada;
	}

	public void setCorrLlamada(Long corrLlamada) {
		this.corrLlamada = corrLlamada;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof LlamadaVentaId))
			return false;
		LlamadaVentaId castOther = (LlamadaVentaId) other;

		return (this.getDetalleId() == castOther.getDetalleId())
				&& (this.getCorrLlamada() == castOther.getCorrLlamada());
	}

	public int hashCode() {
		int result = 17;
		result = 37 * result + this.getDetalleId().intValue();
		result = 37 * result + this.getCorrLlamada().intValue();
		return result;
	}

}
