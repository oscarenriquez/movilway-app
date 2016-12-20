package movilway.dao.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


@SuppressWarnings("serial")
public class Traslado implements Serializable {

	private Long trasladoId;
	private BigDecimal montoTransf;
	private BigDecimal montoAntesDestino;
	private BigDecimal montoDespuesDestino;
	private Long puntoOrigenId;
	private Long puntoDestinoId;
	private Date fechahora;
	private BigDecimal montoAntesOrigen;
	private BigDecimal montoDespuesOrigen;
	private Long empresaId;	

	public Long getId() {
		return this.trasladoId;
	}
	
	public Long getTrasladoId() {
		return this.trasladoId;
	}

	public void setTrasladoId(Long trasladoId) {
		this.trasladoId = trasladoId;
	}

	public BigDecimal getMontoTransf() {
		return this.montoTransf;
	}

	public void setMontoTransf(BigDecimal montoTransf) {
		this.montoTransf = montoTransf;
	}

	public BigDecimal getMontoAntesDestino() {
		return this.montoAntesDestino;
	}

	public void setMontoAntesDestino(BigDecimal montoAntesDestino) {
		this.montoAntesDestino = montoAntesDestino;
	}

	public BigDecimal getMontoDespuesDestino() {
		return this.montoDespuesDestino;
	}

	public void setMontoDespuesDestino(BigDecimal montoDespuesDestino) {
		this.montoDespuesDestino = montoDespuesDestino;
	}

	public Long getPuntoOrigenId() {
		return this.puntoOrigenId;
	}

	public void setPuntoOrigenId(Long puntoOrigenId) {
		this.puntoOrigenId = puntoOrigenId;
	}

	public Long getPuntoDestinoId() {
		return this.puntoDestinoId;
	}

	public void setPuntoDestinoId(Long puntoDestinoId) {
		this.puntoDestinoId = puntoDestinoId;
	}

	public Date getFechahora() {
		return this.fechahora;
	}

	public void setFechahora(Date fechahora) {
		this.fechahora = fechahora;
	}

	public BigDecimal getMontoAntesOrigen() {
		return this.montoAntesOrigen;
	}

	public void setMontoAntesOrigen(BigDecimal montoAntesOrigen) {
		this.montoAntesOrigen = montoAntesOrigen;
	}

	public BigDecimal getMontoDespuesOrigen() {
		return this.montoDespuesOrigen;
	}

	public void setMontoDespuesOrigen(BigDecimal montoDespuesOrigen) {
		this.montoDespuesOrigen = montoDespuesOrigen;
	}

	public Long getEmpresaId() {
		return this.empresaId;
	}

	public void setEmpresaId(Long empresaId) {
		this.empresaId = empresaId;
	}

}
