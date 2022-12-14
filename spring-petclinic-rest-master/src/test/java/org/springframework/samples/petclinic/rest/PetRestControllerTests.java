package org.springframework.samples.petclinic.rest;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.service.clinicService.ApplicationTestConfig;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;


@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=ApplicationTestConfig.class)
@WebAppConfiguration
public class PetRestControllerTests {

    @Autowired
    private PetRestController petRestController;

    @MockBean
    protected ClinicService clinicService;

    private MockMvc mockMvc;

    private List<Pet> pets;

    @Before
    public void initPets(){
    	this.mockMvc = MockMvcBuilders.standaloneSetup(petRestController)
    			.setControllerAdvice(new ExceptionControllerAdvice())
    			.build();
    	pets = new ArrayList<Pet>();

    	Owner owner = new Owner();
    	owner.setId(1);
    	owner.setFirstName("Eduardo");
    	owner.setLastName("Rodriquez");
    	owner.setAddress("2693 Commerce St.");
    	owner.setCity("McFarland");
    	owner.setTelephone("6085558763");

    	PetType petType = new PetType();
    	petType.setId(2);
    	petType.setName("dog");

    	Pet pet = new Pet();
    	pet.setId(3);
    	pet.setName("Rosy");
    	pet.setBirthDate(new Date());
    	pet.setOwner(owner);
    	pet.setType(petType);
    	pets.add(pet);

    	pet = new Pet();
    	pet.setId(4);
    	pet.setName("Jewel");
    	pet.setBirthDate(new Date());
    	pet.setOwner(owner);
    	pet.setType(petType);
    	pets.add(pet);
    }

    @Test
    @WithMockUser(roles="OWNER_ADMIN")
    public void testGetPetSuccess() throws Exception {
    	given(this.clinicService.findPetById(3)).willReturn(pets.get(0));
        this.mockMvc.perform(get("/api/pets/3")
        	.accept(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.id").value(3))
            .andExpect(jsonPath("$.name").value("Rosy"));
    }

    @Test
    @WithMockUser(roles="OWNER_ADMIN")
    public void testGetPetNotFound() throws Exception {
    	given(this.clinicService.findPetById(-1)).willReturn(null);
        this.mockMvc.perform(get("/api/pets/-1")
        	.accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles="OWNER_ADMIN")
    public void testGetAllPetsSuccess() throws Exception {
    	given(this.clinicService.findAllPets()).willReturn(pets);
        this.mockMvc.perform(get("/api/pets/")
        	.accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.[0].id").value(3))
            .andExpect(jsonPath("$.[0].name").value("Rosy"))
            .andExpect(jsonPath("$.[1].id").value(4))
            .andExpect(jsonPath("$.[1].name").value("Jewel"));
    }

    @Test
    @WithMockUser(roles="OWNER_ADMIN")
    public void testGetAllPetsNotFound() throws Exception {
    	pets.clear();
    	given(this.clinicService.findAllPets()).willReturn(pets);
        this.mockMvc.perform(get("/api/pets/")
        	.accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles="OWNER_ADMIN")
    public void testCreatePetSuccess() throws Exception {
    	Pet newPet = pets.get(0);
    	newPet.setId(999);
    	ObjectMapper mapper = new ObjectMapper();
    	String newPetAsJSON = mapper.writeValueAsString(newPet);
    	this.mockMvc.perform(post("/api/pets/")
    		.content(newPetAsJSON).accept(MediaType.APPLICATION_JSON_VALUE).contentType(MediaType.APPLICATION_JSON_VALUE))
    		.andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(roles="OWNER_ADMIN")
    public void testCreatePetError() throws Exception {
    	Pet newPet = pets.get(0);
    	newPet.setId(null);
    	newPet.setName(null);
    	ObjectMapper mapper = new ObjectMapper();
    	String newPetAsJSON = mapper.writeValueAsString(newPet);
    	this.mockMvc.perform(post("/api/pets/")
        		.content(newPetAsJSON).accept(MediaType.APPLICATION_JSON_VALUE).contentType(MediaType.APPLICATION_JSON_VALUE))
        		.andExpect(status().isBadRequest()).andDo(MockMvcResultHandlers.print());
     }

    @Test
    @WithMockUser(roles="OWNER_ADMIN")
    public void testUpdatePetSuccess() throws Exception {
    	given(this.clinicService.findPetById(3)).willReturn(pets.get(0));
    	Pet newPet = pets.get(0);
    	newPet.setName("Rosy I");
    	ObjectMapper mapper = new ObjectMapper();
    	String newPetAsJSON = mapper.writeValueAsString(newPet);
    	this.mockMvc.perform(put("/api/pets/3")
    		.content(newPetAsJSON).accept(MediaType.APPLICATION_JSON_VALUE).contentType(MediaType.APPLICATION_JSON_VALUE))
        	.andExpect(content().contentType("application/json"))
        	.andExpect(status().isNoContent());

    	this.mockMvc.perform(get("/api/pets/3")
           	.accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.id").value(3))
            .andExpect(jsonPath("$.name").value("Rosy I"));

    }

    @Test
    @WithMockUser(roles="OWNER_ADMIN")
    public void testUpdatePetError() throws Exception {
    	Pet newPet = pets.get(0);
    	newPet.setName("");
    	ObjectMapper mapper = new ObjectMapper();
    	String newPetAsJSON = mapper.writeValueAsString(newPet);
    	this.mockMvc.perform(put("/api/pets/3")
    		.content(newPetAsJSON).accept(MediaType.APPLICATION_JSON_VALUE).contentType(MediaType.APPLICATION_JSON_VALUE))
        	.andExpect(status().isBadRequest());
     }

    @Test
    @WithMockUser(roles="OWNER_ADMIN")
    public void testDeletePetSuccess() throws Exception {
    	Pet newPet = pets.get(0);
    	ObjectMapper mapper = new ObjectMapper();
    	String newPetAsJSON = mapper.writeValueAsString(newPet);
    	given(this.clinicService.findPetById(3)).willReturn(pets.get(0));
    	this.mockMvc.perform(delete("/api/pets/3")
    		.content(newPetAsJSON).accept(MediaType.APPLICATION_JSON_VALUE).contentType(MediaType.APPLICATION_JSON_VALUE))
        	.andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(roles="OWNER_ADMIN")
    public void testDeletePetError() throws Exception {
    	Pet newPet = pets.get(0);
    	ObjectMapper mapper = new ObjectMapper();
    	String newPetAsJSON = mapper.writeValueAsString(newPet);
    	given(this.clinicService.findPetById(-1)).willReturn(null);
    	this.mockMvc.perform(delete("/api/pets/-1")
    		.content(newPetAsJSON).accept(MediaType.APPLICATION_JSON_VALUE).contentType(MediaType.APPLICATION_JSON_VALUE))
        	.andExpect(status().isNotFound());
    }

}
