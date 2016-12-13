package movilway.service;

import java.util.List;
import java.util.Map;

import movilway.dao.domain.CampanaDetalle;
import movilway.dao.exception.InfraestructureException;
import movilway.service.util.GenericService;

public interface CampanaService<T> extends GenericService<T>  {

	public List<Map<String, Object>> getInforCampanasByUser(Long userId, String estatus) throws InfraestructureException;
	
	public List<CampanaDetalle> getListaCampanaDetalle(Long campanaId, Integer amount, String estatus) throws InfraestructureException;
}
