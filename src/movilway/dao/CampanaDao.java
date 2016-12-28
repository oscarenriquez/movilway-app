package movilway.dao;

import java.util.List;
import java.util.Map;

import movilway.dao.domain.Campana;
import movilway.dao.domain.CampanaDetalle;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface CampanaDao<T> extends GenericDao<T>  {

	public Campana getCampanaActiva (Long empresaId, String estatus) throws InfraestructureException;
	
	public Campana getCampanaAbastecimientoActiva (Long empresaId, String estatus, Long tipocampanaId) throws InfraestructureException;
	
	public List<Map<String, Object>> getInforCampanasByUser(Long userId, String estatus) throws InfraestructureException;
	
	public List<CampanaDetalle> getListaCampanaDetalle(Long campanaId, Integer amount, String estatus, String dateSubstract) throws InfraestructureException;
	
	public List<Campana> getListaCampanas(Long empresaId) throws InfraestructureException;
}
