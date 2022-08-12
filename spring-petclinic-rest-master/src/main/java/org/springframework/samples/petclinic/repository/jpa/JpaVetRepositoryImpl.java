package org.springframework.samples.petclinic.repository.jpa;

import org.springframework.context.annotation.Profile;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.model.Vet;
import org.springframework.samples.petclinic.repository.VetRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;

@Repository
@Profile("jpa")
public class JpaVetRepositoryImpl implements VetRepository {

    @PersistenceContext
    private EntityManager em;


	@Override
	public Vet findById(int id) throws DataAccessException {
		return this.em.find(Vet.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Vet> findAll() throws DataAccessException {
		return this.em.createQuery("SELECT vet FROM Vet vet").getResultList();
	}

	@Override
	public void save(Vet vet) throws DataAccessException {
        if (vet.getId() == null) {
            this.em.persist(vet);
        } else {
            this.em.merge(vet);
        }
	}

	@Override
	public void delete(Vet vet) throws DataAccessException {
		this.em.remove(this.em.contains(vet) ? vet : this.em.merge(vet));
	}


}
