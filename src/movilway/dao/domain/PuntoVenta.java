package movilway.dao.domain;

import com.vividsolutions.jts.geom.Point;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.Date;


@SuppressWarnings("serial")
public class PuntoVenta implements Serializable {

	private Long id;
	private Long empresaId;
	private String puntoventaId;
	private Estado estado;
	private Pais pais;
	private Provincia provincia;
	private TipoPuntoVenta tipoPuntoVenta;
	private Integer telefono;
	private String descripcion;
	private String nivel;
	private RegionProvincia regionProvincia;
	private String direccion;
	private String observaciones;
	private String DPuntoventasuperior;
	private BigDecimal saldo;
	private Date saldoFechahora;
	private Point coordenada;
	private Float latitud;
	private Float longitud;
	private BigDecimal puntoAbastecimiento;
	private String contacto;
	
	public static final Comparator<PuntoVenta> BY_SALDO = new Comparator<PuntoVenta>() {
		@Override
		public int compare(PuntoVenta o1, PuntoVenta o2) {	
			return o1.saldo.compareTo(o2.saldo);
		}
	};
	
	public Long getId() {
		return id;
	}

	public Long getEmpresaId() {
		return empresaId;
	}

	public void setEmpresaId(Long empresaId) {
		this.empresaId = empresaId;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPuntoventaId() {
		return this.puntoventaId;
	}

	public void setPuntoventaId(String puntoventaId) {
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

	public RegionProvincia getRegionProvincia() {
		return regionProvincia;
	}

	public void setRegionProvincia(RegionProvincia regionProvincia) {
		this.regionProvincia = regionProvincia;
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

	public String getDPuntoventasuperior() {
		return this.DPuntoventasuperior;
	}

	public void setDPuntoventasuperior(String DPuntoventasuperior) {
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

	public Point getCoordenada() {
		return coordenada;
	}

	public void setCoordenada(Point coordenada) {
		this.coordenada = coordenada;
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

	public String getContacto() {
		return this.contacto;
	}

	public void setContacto(String contacto) {
		this.contacto = contacto;
	}
	
	public Boolean generaOrden() {
		if(this.saldo == null || this.saldo.compareTo(new BigDecimal(0)) == 0)
			return true;
		if(this.puntoAbastecimiento == null)
			return false;
		return this.saldo.compareTo(this.puntoAbastecimiento) <= 0;
	}

	@Override
	public String toString() {
		return "PuntoVenta [id=" + id + ", empresaId=" + empresaId + ", puntoventaId=" + puntoventaId + ", estado="
				+ estado + ", pais=" + pais + ", provincia=" + provincia + ", tipoPuntoVenta=" + tipoPuntoVenta
				+ ", telefono=" + telefono + ", descripcion=" + descripcion + ", nivel=" + nivel + ", regionProvincia="
				+ regionProvincia + ", direccion=" + direccion + ", observaciones=" + observaciones
				+ ", DPuntoventasuperior=" + DPuntoventasuperior + ", saldo=" + saldo + ", saldoFechahora="
				+ saldoFechahora + ", coordenada=" + coordenada + ", latitud=" + latitud + ", longitud=" + longitud
				+ ", puntoAbastecimiento=" + puntoAbastecimiento + ", contacto=" + contacto + "]";
	}	
}
