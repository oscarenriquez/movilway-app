package movilway.dao.domain;

import java.io.Serializable;
import java.math.BigDecimal;

@SuppressWarnings("serial")
public class LlamadaVenta implements Serializable {

	private LlamadaVentaId id;
	private BigDecimal montoTraspaso;
	private Long origenPuntoventaId;
	private Long destinoPuntoventaId;
	private String comentarios;
	
	public LlamadaVentaId getId() {
		return this.id;
	}

	public void setId(LlamadaVentaId id) {
		this.id = id;
	}

	public BigDecimal getMontoTraspaso() {
		return this.montoTraspaso;
	}

	public void setMontoTraspaso(BigDecimal montoTraspaso) {
		this.montoTraspaso = montoTraspaso;
	}

	public Long getOrigenPuntoventaId() {
		return this.origenPuntoventaId;
	}

	public void setOrigenPuntoventaId(Long origenPuntoventaId) {
		this.origenPuntoventaId = origenPuntoventaId;
	}

	public Long getDestinoPuntoventaId() {
		return this.destinoPuntoventaId;
	}

	public void setDestinoPuntoventaId(Long destinoPuntoventaId) {
		this.destinoPuntoventaId = destinoPuntoventaId;
	}

	public String getComentarios() {
		return this.comentarios;
	}

	public void setComentarios(String comentarios) {
		this.comentarios = comentarios;
	}

}
