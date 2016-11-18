package movilway.dao.domain;

import java.io.Serializable;

@SuppressWarnings("serial")
public class LlamadaId implements Serializable {

	private Long detalleId;
	private Integer corrLlamada;

	public LlamadaId() {
	}

	public LlamadaId(Long detalleId, Integer corrLlamada) {
		this.detalleId = detalleId;
		this.corrLlamada = corrLlamada;
	}

	public Long getDetalleId() {
		return this.detalleId;
	}

	public void setDetalleId(Long detalleId) {
		this.detalleId = detalleId;
	}

	public Integer getCorrLlamada() {
		return this.corrLlamada;
	}

	public void setCorrLlamada(Integer corrLlamada) {
		this.corrLlamada = corrLlamada;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof LlamadaId))
			return false;
		LlamadaId castOther = (LlamadaId) other;

		return (this.getDetalleId() == castOther.getDetalleId())
				&& (this.getCorrLlamada() == castOther.getCorrLlamada());
	}

	public int hashCode() {
		Integer result = 17;

		result = 37 * result + this.getDetalleId().intValue();
		result = 37 * result + this.getCorrLlamada().intValue();
		return result;
	}

}
