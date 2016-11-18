package movilway.dao.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@SuppressWarnings("serial")
public class PuntoVenta implements Serializable {

	private Long puntoventaId;
	private Estado estado;
	private Pais pais;
	private Provincia provincia;
	private TipoPuntoVenta tipoPuntoVenta;
	private Integer telefono;
	private String descripcion;
	private String nivel;
	private Long regionprovinciaId;
	private String direccion;
	private String observaciones;
	private Long DPuntoventasuperior;
	private BigDecimal saldo;
	private Date saldoFechahora;
	private Float latitud;
	private Float longitud;
	private BigDecimal puntoAbastecimiento;
	private String conctacto;	

	public Long getPuntoventaId() {
		return this.puntoventaId;
	}

	public void setPuntoventaId(Long puntoventaId) {
		this.puntoventaId = puntoventaId;
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

	public Provincia getProvincia() {
		return this.provincia;
	}

	public void setProvincia(Provincia provincia) {
		this.provincia = provincia;
	}

	public TipoPuntoVenta getTipoPuntoVenta() {
		return this.tipoPuntoVenta;
	}

	public void setTipoPuntoVenta(TipoPuntoVenta tipoPuntoVenta) {
		this.tipoPuntoVenta = tipoPuntoVenta;
	}

	public Integer getTelefono() {
		return this.telefono;
	}

	public void setTelefono(Integer telefono) {
		this.telefono = telefono;
	}

	public String getDescripcion() {
		return this.descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getNivel() {
		return this.nivel;
	}

	public void setNivel(String nivel) {
		this.nivel = nivel;
	}

	public Long getRegionprovinciaId() {
		return this.regionprovinciaId;
	}

	public void setRegionprovinciaId(Long regionprovinciaId) {
		this.regionprovinciaId = regionprovinciaId;
	}

	public String getDireccion() {
		return this.direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getObservaciones() {
		return this.observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public Long getDPuntoventasuperior() {
		return this.DPuntoventasuperior;
	}

	public void setDPuntoventasuperior(Long DPuntoventasuperior) {
		this.DPuntoventasuperior = DPuntoventasuperior;
	}

	public BigDecimal getSaldo() {
		return this.saldo;
	}

	public void setSaldo(BigDecimal saldo) {
		this.saldo = saldo;
	}

	public Date getSaldoFechahora() {
		return this.saldoFechahora;
	}

	public void setSaldoFechahora(Date saldoFechahora) {
		this.saldoFechahora = saldoFechahora;
	}

	public Float getLatitud() {
		return this.latitud;
	}

	public void setLatitud(Float latitud) {
		this.latitud = latitud;
	}

	public Float getLongitud() {
		return this.longitud;
	}

	public void setLongitud(Float longitud) {
		this.longitud = longitud;
	}

	public BigDecimal getPuntoAbastecimiento() {
		return this.puntoAbastecimiento;
	}

	public void setPuntoAbastecimiento(BigDecimal puntoAbastecimiento) {
		this.puntoAbastecimiento = puntoAbastecimiento;
	}

	public String getConctacto() {
		return this.conctacto;
	}

	public void setConctacto(String conctacto) {
		this.conctacto = conctacto;
	}

}
