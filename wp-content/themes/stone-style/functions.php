/*
 * Theme Name: STONE STYLE TEMPLATE
 * Theme URI: https://stonestyle.co.th
 * Author: Stone & Style
 * Version: 2.0.1
 * Text Domain: stone-style
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define theme constants
define('STONE_STYLE_VERSION', '2.0.1');
define('STONE_STYLE_DIR', get_template_directory());
define('STONE_STYLE_URI', get_template_directory_uri());

// Theme setup
function stone_style_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'stone-style'),
        'footer' => __('Footer Menu', 'stone-style')
    ));

    // HTML5 support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption'
    ));
}
add_action('after_setup_theme', 'stone_style_setup');

// Enqueue scripts and styles
function stone_style_scripts() {
    // Main stylesheet
    wp_enqueue_style(
        'stone-style-main',
        STONE_STYLE_URI . '/dist/prod-style.css',
        array(),
        STONE_STYLE_VERSION
    );

    // Vendor JS (Three.js, GSAP, Barba.js, WebFont Loader)
    wp_enqueue_script(
        'stone-style-vendor',
        STONE_STYLE_URI . '/dist/prod-vendor.js',
        array(),
        STONE_STYLE_VERSION,
        true
    );

    // Main script
    wp_enqueue_script(
        'stone-style-main',
        STONE_STYLE_URI . '/dist/prod-script.js',
        array('stone-style-vendor'),
        STONE_STYLE_VERSION,
        true
    );

    // Pass data to JavaScript
    wp_localize_script('stone-style-main', 'stoneStyleData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'restUrl' => rest_url(),
        'nonce' => wp_create_nonce('wp_rest'),
        'themeDir' => STONE_STYLE_URI,
        'version' => STONE_STYLE_VERSION
    ));
}
add_action('wp_enqueue_scripts', 'stone_style_scripts');

// Custom image sizes
function stone_style_image_sizes() {
    add_image_size('stone-large', 1920, 1080, true);
    add_image_size('stone-medium', 1200, 675, true);
    add_image_size('stone-small', 640, 360, true);
}
add_action('after_setup_theme', 'stone_style_image_sizes');

// Register custom post types
function stone_style_register_post_types() {
    // Brands CPT
    register_post_type('brand', array(
        'labels' => array(
            'name' => __('Brands', 'stone-style'),
            'singular_name' => __('Brand', 'stone-style')
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-art',
        'rewrite' => array('slug' => 'brands')
    ));

    // Gallery CPT
    register_post_type('gallery_item', array(
        'labels' => array(
            'name' => __('Gallery', 'stone-style'),
            'singular_name' => __('Gallery Item', 'stone-style')
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-format-gallery',
        'rewrite' => array('slug' => 'gallery')
    ));
}
add_action('init', 'stone_style_register_post_types');

// Custom template loader
function stone_style_template_include($template) {
    if (is_page()) {
        $page_template = get_page_template_slug();
        if ($page_template) {
            $custom_template = locate_template(array($page_template));
            if ($custom_template) {
                return $custom_template;
            }
        }
    }
    return $template;
}
add_filter('template_include', 'stone_style_template_include');

// Remove WordPress default features for cleaner output
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head');

// Custom excerpt length
function stone_style_excerpt_length($length) {
    return 25;
}
add_filter('excerpt_length', 'stone_style_excerpt_length');
