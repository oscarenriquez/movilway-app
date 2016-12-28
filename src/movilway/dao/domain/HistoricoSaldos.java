package movilway.dao.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@SuppressWarnings("serial")
public class HistoricoSaldos implements Serializable {

	private Long historicosaldosId;
	private ArchivoSaldos archivoSaldos;
	private Long empresaId;
	private PuntoVenta puntoVenta;	
	private String puntoventaId;
	private BigDecimal saldo;
	private Date fechaSaldo;
	
	public Long getHistoricosaldosId() {
		return historicosaldosId;
	}
	public void setHistoricosaldosId(Long historicosaldosId) {
		this.historicosaldosId = historicosaldosId;
	}
	public ArchivoSaldos getArchivoSaldos() {
		return archivoSaldos;
	}
	public void setArchivoSaldos(ArchivoSaldos archivoSaldos) {
		this.archivoSaldos = archivoSaldos;
	}
	public Long getEmpresaId() {
		return empresaId;
	}
	public void setEmpresaId(Long empresaId) {
		this.empresaId = empresaId;
	}
	public PuntoVenta getPuntoVenta() {
		return puntoVenta;
	}
	public void setPuntoVenta(PuntoVenta puntoVenta) {
		this.puntoVenta = puntoVenta;
	}
	public String getPuntoventaId() {
		return puntoventaId;
	}
	public void setPuntoventaId(String puntoventaId) {
		this.puntoventaId = puntoventaId;
	}
	public BigDecimal getSaldo() {
		return saldo;
	}
	public void setSaldo(BigDecimal saldo) {
		this.saldo = saldo;
	}
	public Date getFechaSaldo() {
		return fechaSaldo;
	}
	public void setFechaSaldo(Date fechaSaldo) {
		this.fechaSaldo = fechaSaldo;
	}
	
}
