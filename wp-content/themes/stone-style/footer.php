<?php
/**
 * Footer Template
 */
?>
    </div><!-- /data-barba="wrapper" -->
    
    <!-- Footer -->
    <footer class="site-footer">
        <div class="footer-grid">
            <!-- Brands Column -->
            <div class="footer-col">
                <h4>Brands</h4>
                <ul>
                    <li><a href="<?php echo home_url('/brands/antolini/'); ?>">Antolini</a></li>
                    <li><a href="<?php echo home_url('/brands/silestone/'); ?>">Silestone</a></li>
                    <li><a href="<?php echo home_url('/brands/dekton/'); ?>">Dekton</a></li>
                    <li><a href="<?php echo home_url('/brands/sicis/'); ?>">Sicis Vetrite</a></li>
                    <li><a href="<?php echo home_url('/brands/santamargherita/'); ?>">Santamargherita</a></li>
                    <li><a href="<?php echo home_url('/brands/parklex/'); ?>">Parklex</a></li>
                </ul>
            </div>
            
            <!-- Company Column -->
            <div class="footer-col">
                <h4>Company</h4>
                <ul>
                    <li><a href="<?php echo home_url('/about/'); ?>">About Us</a></li>
                    <li><a href="<?php echo home_url('/news/'); ?>">News</a></li>
                    <li><a href="<?php echo home_url('/gallery/'); ?>">Gallery</a></li>
                    <li><a href="<?php echo home_url('/contact/'); ?>">Contact</a></li>
                </ul>
            </div>
            
            <!-- Contact Column -->
            <div class="footer-col footer-contact">
                <h4>Contact</h4>
                <p>
                    Stone & Style Co., Ltd.<br>
                    Bangkok, Thailand<br><br>
                    <a href="tel:+6621234567">+66 2 123 4567</a><br>
                    <a href="mailto:info@stonestyle.co.th">info@stonestyle.co.th</a>
                </p>
            </div>
            
            <!-- Social Column -->
            <div class="footer-col">
                <h4>Follow Us</h4>
                <div class="footer-social">
                    <a href="#" aria-label="Facebook">
                        <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                    </a>
                    <a href="#" aria-label="Instagram">
                        <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2"/></svg>
                    </a>
                    <a href="#" aria-label="Line">
                        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 5.58 2 10c0 2.03.94 3.89 2.5 5.31V19l3.5-2h4c5.52 0 10-3.58 10-8s-4.48-8-10-8zm0 14c-4.42 0-8-2.69-8-6s3.58-6 8-6 8 2.69 8 6-3.58 6-8 6z"/></svg>
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Footer Bottom -->
        <div class="footer-bottom">
            <p class="footer-copy">
                &copy; <?php echo date('Y'); ?> Stone & Style Co., Ltd. All rights reserved.
            </p>
            <p class="footer-copy">
                <a href="<?php echo home_url('/privacy-policy/'); ?>">Privacy Policy</a> | 
                <a href="<?php echo home_url('/terms/'); ?>">Terms of Service</a>
            </p>
        </div>
    </footer>
</div><!-- /site-window -->

<!-- Scripts -->
<?php wp_footer(); ?>

</body>
</html>
