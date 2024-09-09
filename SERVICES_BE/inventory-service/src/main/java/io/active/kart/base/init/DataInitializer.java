package io.active.kart.base.init;

import io.active.kart.base.entity.Category;
import io.active.kart.base.entity.Product;
import io.active.kart.base.entity.SubCategory;
import io.active.kart.inventory.repository.CategoryRepository;
import io.active.kart.inventory.repository.ProductRepository;
import io.active.kart.inventory.repository.SubCategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class DataInitializer {


    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final ProductRepository productRepository;
    private final Logger LOGGER = LoggerFactory.getLogger("DataInitializer.class");

    public DataInitializer(CategoryRepository categoryRepository,
                           SubCategoryRepository subCategoryRepository,
                           ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productRepository = productRepository;
    }


    @Bean
    public CommandLineRunner initializeData() {
        //LOGGER.info("========================================================= AnnotationDrivenEndpointsListener");
        return args -> {

            // Category

//            Category c1 = new Category();
//            c1.setName("C-1");
//            categoryRepository.save(c1);
//
//            Category c2 = new Category();
//            c2.setName("C-2");
//            categoryRepository.save(c2);

            // Sub Category

//            SubCategory sc1 = new SubCategory();
//            sc1.setName("SC-1_C-1");
//            sc1.setCategory(c1);
//            subCategoryRepository.save(sc1);
//
//            SubCategory sc2 = new SubCategory();
//            sc2.setName("SC-2_C-1");
//            sc2.setCategory(c1);
//            subCategoryRepository.save(sc2);
//
//            SubCategory sc3 = new SubCategory();
//            sc3.setName("SC-3_C-2");
//            sc3.setCategory(c2);
//            subCategoryRepository.save(sc3);
//
//            SubCategory sc4 = new SubCategory();
//            sc4.setName("SC-4_C-2");
//            sc4.setCategory(c2);
//            subCategoryRepository.save(sc4);


            // Product

//            productRepository.save(new Product("P-1", c1, sc1));
//            productRepository.save(new Product("P-2", c1, sc1));
//            productRepository.save(new Product("P-3", c1, sc2));
//            productRepository.save(new Product("P-4", c1, sc2));
//            productRepository.save(new Product("P-5", c2, sc3));
//            productRepository.save(new Product("P-6", c2, sc3));
//            productRepository.save(new Product("P-7", c2, sc4));
//            productRepository.save(new Product("P-8", c2, sc4));

        };

    }

}
