package org.springframework.samples.petclinic.repository.springdatajpa;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.context.annotation.Profile;
import org.springframework.samples.petclinic.model.Pet;

@Profile("spring-data-jpa")
public class SpringDataPetRepositoryImpl implements PetRepositoryOverride {

	@PersistenceContext
    private EntityManager em;

	@Override
	public void delete(Pet pet) {
		String petId = pet.getId().toString();
		this.em.createQuery("DELETE FROM Visit visit WHERE pet_id=" + petId).executeUpdate();
		this.em.createQuery("DELETE FROM Pet pet WHERE id=" + petId).executeUpdate();
        if (em.contains(pet)) {
            em.remove(pet);
        }
	}

}
