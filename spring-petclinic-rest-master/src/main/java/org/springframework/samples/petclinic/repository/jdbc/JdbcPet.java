package org.springframework.samples.petclinic.repository.jdbc;

import org.springframework.samples.petclinic.model.Pet;

public class JdbcPet extends Pet {

    private int typeId;

    private int ownerId;

    public int getTypeId() {
        return this.typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public int getOwnerId() {
        return this.ownerId;
    }

    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }

}
