package org.springframework.samples.petclinic.repository.springdatajpa;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.context.annotation.Profile;
import org.springframework.samples.petclinic.model.Specialty;

@Profile("spring-data-jpa")
public class SpringDataSpecialtyRepositoryImpl implements SpecialtyRepositoryOverride {

	@PersistenceContext
    private EntityManager em;

	@Override
	public void delete(Specialty specialty) {
        this.em.remove(this.em.contains(specialty) ? specialty : this.em.merge(specialty));
		Integer specId = specialty.getId();
		this.em.createNativeQuery("DELETE FROM vet_specialties WHERE specialty_id=" + specId).executeUpdate();
		this.em.createQuery("DELETE FROM Specialty specialty WHERE id=" + specId).executeUpdate();
	}

}
