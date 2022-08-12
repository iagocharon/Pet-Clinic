package org.springframework.samples.petclinic.service.clinicService;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("jpa, hsqldb")
public class ClinicServiceJpaTests extends AbstractClinicServiceTests {

}
