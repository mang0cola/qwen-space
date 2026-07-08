<?php
/**
 * Header Template
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://use.typekit.net">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Custom Cursor -->
<div class="cursor"></div>

<!-- Noise Overlay (optional texture) -->
<div class="noize"></div>

<!-- Site Window (DOM content layer) -->
<div class="site-window">
    <!-- Header -->
    <header class="site-header">
        <!-- Logo -->
        <a href="<?php echo home_url(); ?>" class="site-logo js-hover-header">
            <?php if (has_custom_logo()) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <span>STONE & STYLE</span>
            <?php endif; ?>
        </a>
        
        <!-- Desktop Navigation -->
        <nav class="site-nav is-desktop">
            <a href="<?php echo home_url('/brands/'); ?>" class="js-hover-header">Brands</a>
            <a href="<?php echo home_url('/news/'); ?>" class="js-hover-header">News</a>
            <a href="<?php echo home_url('/gallery/'); ?>" class="js-hover-header">Gallery</a>
            <a href="<?php echo home_url('/contact/'); ?>" class="js-hover-header">Contact</a>
        </nav>
        
        <!-- Right Controls -->
        <div class="site-controls">
            <!-- Language Switcher -->
            <div class="site-lang">
                <?php 
                $current_lang = substr(get_locale(), 0, 2);
                ?>
                <a href="#" data-lang="en" class="js-lang-switch <?php echo $current_lang === 'en' ? 'active' : ''; ?>">EN</a>
                <a href="#" data-lang="th" class="js-lang-switch <?php echo $current_lang === 'th' ? 'active' : ''; ?>">TH</a>
            </div>
            
            <!-- Theme Switcher -->
            <button class="site-color js-switch-color" aria-label="Toggle theme">
                <svg class="site-color-icon" viewBox="0 0 24 24">
                    <path d="M12 4a1 1 0 011-1h0a1 1 0 011 1v0a1 1 0 01-1 1h0a1 1 0 01-1-1V4zm0 14a1 1 0 011-1h0a1 1 0 011 1v0a1 1 0 01-1 1h0a1 1 0 01-1-1v0zM6.34 6.34a1 1 0 011.41-1.41h0a1 1 0 010 1.41h0a1 1 0 01-1.41 0zm11.32 11.32a1 1 0 011.41-1.41h0a1 1 0 010 1.41h0a1 1 0 01-1.41 0zM4 12a1 1 0 011-1h0a1 1 0 010 1h0a1 1 0 01-1 0zm14 0a1 1 0 011-1h0a1 1 0 010 1h0a1 1 0 01-1 0zM6.34 17.66a1 1 0 010-1.41h0a1 1 0 011.41 0v0a1 1 0 01-1.41 1.41zm11.32-11.32a1 1 0 010-1.41h0a1 1 0 011.41 0v0a1 1 0 01-1.41 1.41z"/>
                </svg>
            </button>
            
            <!-- Mobile Menu Toggle -->
            <button class="site-toggle" aria-label="Menu">
                <span class="site-toggle-line"></span>
                <span class="site-toggle-line"></span>
                <span class="site-toggle-line"></span>
            </button>
        </div>
    </header>
    
    <!-- Mobile Menu Panel -->
    <div class="site-header-r">
        <nav class="site-menu-nav">
            <a href="<?php echo home_url('/brands/'); ?>" class="js-hover-header">Brands</a>
            <a href="<?php echo home_url('/news/'); ?>" class="js-hover-header">News</a>
            <a href="<?php echo home_url('/gallery/'); ?>" class="js-hover-header">Gallery</a>
            <a href="<?php echo home_url('/contact/'); ?>" class="js-hover-header">Contact</a>
        </nav>
    </div>
    
    <!-- Menu Background Overlay -->
    <div class="site-menu-bg"></div>
    
    <!-- Barba.js Wrapper -->
    <div data-barba="wrapper">
