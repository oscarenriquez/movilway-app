package movilway.dao;

import java.util.List;

import movilway.dao.domain.CampanaDetalle;
import movilway.dao.exception.InfraestructureException;
import movilway.dao.util.GenericDao;

public interface CampanaDetalleDao<T> extends GenericDao<T>  {

	List<CampanaDetalle> getListaCampanaDetalleByAgente(Long agenteId, String estatus) throws InfraestructureException;
}
