<?php
/**
 * Template Name: Home Page
 * Template for Stone & Style Homepage
 */

get_header();
?>

<main data-barba="container" data-barba-namespace="home">
    <!-- WebGL Canvas -->
    <canvas id="js-front" class="gl"></canvas>
    
    <!-- First View (Hero) -->
    <section class="home-fv">
        <div class="home-fv-content">
            <h1 class="felix-xxl">STONE & STYLE</h1>
            <p class="nimbus-lg">Luxury Stone Curator Platform</p>
        </div>
        
        <div class="scroll-down js-hover-arrow">
            <svg viewBox="0 0 24 24">
                <path d="M12 5v14m-7-7l7 7 7-7" stroke="currentColor" fill="none" stroke-width="2"/>
            </svg>
        </div>
    </section>
    
    <div class="spr" data-n="3"></div>
    
    <!-- About Section -->
    <section class="about-section">
        <h2 class="about-title nimbus-lg">Be the Impossible</h2>
        <div class="about-text">
            <p>We believe that stonework is not merely science and technology, but also a state of the art. Timeless by nature, Tameless by design.</p>
            <p>Stone & Style curates the world's finest surface materials, bringing together natural beauty and innovative engineering.</p>
        </div>
    </section>
    
    <div class="spr" data-n="2"></div>
    
    <!-- Full-width Image Section -->
    <section class="image-section">
        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('stone-large'); ?>
        <?php else : ?>
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero-stone.jpg" alt="Luxury stone surface">
        <?php endif; ?>
    </section>
    
    <div class="spr" data-n="4"></div>
    
    <!-- Brands Slider Section -->
    <section class="brands-section">
        <div class="brands-container">
            <!-- Brand Navigation -->
            <div class="brand-nav">
                <ul>
                    <li><button class="active" data-brand="antolini">Antolini</button></li>
                    <li><button data-brand="silestone">Silestone</button></li>
                    <li><button data-brand="dekton">Dekton</button></li>
                    <li><button data-brand="sicis">Sicis Vetrite</button></li>
                    <li><button data-brand="santamargherita">Santamargherita</button></li>
                    <li><button data-brand="parklex">Parklex</button></li>
                </ul>
            </div>
            
            <!-- Brand Display -->
            <div class="brand-display">
                <div class="brand-image active" data-brand="antolini">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/brands/antolini.jpg" alt="Antolini">
                </div>
                <div class="brand-image" data-brand="silestone">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/brands/silestone.jpg" alt="Silestone">
                </div>
                <div class="brand-image" data-brand="dekton">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/brands/dekton.jpg" alt="Dekton">
                </div>
                <div class="brand-image" data-brand="sicis">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/brands/sicis.jpg" alt="Sicis Vetrite">
                </div>
                <div class="brand-image" data-brand="santamargherita">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/brands/santamargherita.jpg" alt="Santamargherita">
                </div>
                <div class="brand-image" data-brand="parklex">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/brands/parklex.jpg" alt="Parklex">
                </div>
                
                <!-- WebGL overlay for Voronoi transitions -->
                <canvas id="brands-webgl"></canvas>
            </div>
            
            <!-- Brand Description -->
            <div class="brand-desc">
                <h3>Antolini</h3>
                <p>Natural石材 excellence with innovative surface treatments. Antolini brings the beauty of natural marble and granite with enhanced durability.</p>
            </div>
        </div>
    </section>
    
    <div class="spr" data-n="3"></div>
    
    <!-- News Section -->
    <section class="news-section">
        <div class="container">
            <h2 class="felix-xl">Latest News</h2>
            <div class="news-grid">
                <?php
                $news_query = new WP_Query(array(
                    'post_type' => 'post',
                    'posts_per_page' => 2
                ));
                
                if ($news_query->have_posts()) :
                    while ($news_query->have_posts()) : $news_query->the_post();
                        ?>
                        <article class="news-card">
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="news-card-image">
                                    <?php the_post_thumbnail('stone-medium'); ?>
                                </div>
                            <?php endif; ?>
                            <div class="news-card-content">
                                <h3><?php the_title(); ?></h3>
                                <p><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                                <a href="<?php the_permalink(); ?>" class="js-hover-a">Read More</a>
                            </div>
                        </article>
                        <?php
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </div>
        </div>
    </section>
    
    <div class="spr" data-n="4"></div>
    
    <!-- Gallery Section -->
    <section class="gallery-section">
        <div class="js-drag-area"></div>
        <div class="gallery-container">
            <div class="gallery-slide-move">
                <?php
                $gallery_query = new WP_Query(array(
                    'post_type' => 'gallery_item',
                    'posts_per_page' => 6
                ));
                
                if ($gallery_query->have_posts()) :
                    while ($gallery_query->have_posts()) : $gallery_query->the_post();
                        ?>
                        <div class="gallery-card" data-powx="1">
                            <div class="gallery-card-image">
                                <?php the_post_thumbnail('stone-large'); ?>
                            </div>
                            <div class="gallery-card-info">
                                <h3><?php the_title(); ?></h3>
                                <p><?php echo wp_trim_words(get_the_excerpt(), 15); ?></p>
                            </div>
                        </div>
                        <?php
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
