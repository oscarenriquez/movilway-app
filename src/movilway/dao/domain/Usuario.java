package movilway.dao.domain;

import java.io.Serializable;

public class Usuario implements Serializable {

	private static final long serialVersionUID = -6512022908695950314L;

	private Long id;
	private String user;
	private String password;
	private String nombre;
	private String apellido;
	private String eMail;
	private Boolean enabled;
	private Integer pwdPolicy;
	private Boolean forceNewPwd;
	private String locale;
	private Boolean ldap;
	private String dominio;
	private String direccionIp;
	private String nacl;
	private String pwdQuestion;
	private String pwdPhrase;
	private byte[] userPhoto;

	public Usuario() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String geteMail() {
		return eMail;
	}

	public void seteMail(String eMail) {
		this.eMail = eMail;
	}

	public Boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Integer getPwdPolicy() {
		return pwdPolicy;
	}

	public void setPwdPolicy(Integer pwdPolicy) {
		this.pwdPolicy = pwdPolicy;
	}

	public Boolean isForceNewPwd() {
		return forceNewPwd;
	}

	public void setForceNewPwd(Boolean forceNewPwd) {
		this.forceNewPwd = forceNewPwd;
	}

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public Boolean isLdap() {
		return ldap;
	}

	public void setLdap(Boolean ldap) {
		this.ldap = ldap;
	}

	public String getDominio() {
		return dominio;
	}

	public void setDominio(String dominio) {
		this.dominio = dominio;
	}

	public String getDireccionIp() {
		return direccionIp;
	}

	public void setDireccionIp(String direccionIp) {
		this.direccionIp = direccionIp;
	}

	public String getNacl() {
		return nacl;
	}

	public void setNacl(String nacl) {
		this.nacl = nacl;
	}

	public String getPwdQuestion() {
		return pwdQuestion;
	}

	public void setPwdQuestion(String pwdQuestion) {
		this.pwdQuestion = pwdQuestion;
	}

	public byte[] getUserPhoto() {
		return userPhoto;
	}

	public void setUserPhoto(byte[] userPhoto) {
		this.userPhoto = userPhoto;
	}

	public String getPwdPhrase() {
		return pwdPhrase;
	}

	public void setPwdPhrase(String pwdPhrase) {
		this.pwdPhrase = pwdPhrase;
	}	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = (prime * result) + ((apellido == null) ? 0 : apellido.hashCode());
		result = (prime * result) + ((id == null) ? 0 : id.hashCode());
		result = (prime * result) + ((nombre == null) ? 0 : nombre.hashCode());
		result = (prime * result) + ((user == null) ? 0 : user.hashCode());

		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (obj == null) {
			return false;
		}

		if (!(obj instanceof Usuario)) {
			return false;
		}

		Usuario other = (Usuario) obj;
		if (apellido == null) {
			if (other.apellido != null) {
				return false;
			}
		} else if (!apellido.equals(other.apellido)) {
			return false;
		}

		if (id == null) {
			if (other.id != null) {
				return false;
			}
		} else if (!id.equals(other.id)) {
			return false;
		}

		if (nombre == null) {
			if (other.nombre != null) {
				return false;
			}
		} else if (!nombre.equals(other.nombre)) {
			return false;
		}

		if (user == null) {
			if (other.user != null) {
				return false;
			}
		} else if (!user.equals(other.user)) {
			return false;
		}

		return true;
	}
}
