#!/usr/bin/env node

/**
 * Performance check script for Monthly Club
 * Runs basic performance checks and provides optimization suggestions
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Monthly Club Performance Check\n');

// Check for large bundle files
const checkBundleSize = () => {
  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    console.log('❌ No .next directory found. Run "npm run build" first.');
    return;
  }

  console.log('📦 Bundle Analysis:');
  
  // Check static files
  const staticDir = path.join(nextDir, 'static');
  if (fs.existsSync(staticDir)) {
    const chunks = fs.readdirSync(staticDir, { recursive: true });
    let totalSize = 0;
    
    chunks.forEach(file => {
      if (typeof file === 'string' && file.endsWith('.js')) {
        const filePath = path.join(staticDir, file);
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        totalSize += sizeKB;
        
        if (sizeKB > 100) {
          console.log(`  ⚠️  Large JS file: ${file} (${sizeKB}KB)`);
        }
      }
    });
    
    console.log(`  📊 Total JS bundle size: ${Math.round(totalSize / 1024)}MB`);
  }
};

// Check for performance optimizations
const checkOptimizations = () => {
  console.log('\n⚡ Performance Optimizations:');
  
  // Check Next.js config
  const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
  if (fs.existsSync(nextConfigPath)) {
    const config = fs.readFileSync(nextConfigPath, 'utf8');
    
    if (config.includes('optimizePackageImports')) {
      console.log('  ✅ Package import optimization enabled');
    } else {
      console.log('  ⚠️  Consider enabling package import optimization');
    }
  }
  
  // Check for lazy loading
  const pagePath = path.join(process.cwd(), 'app', 'page.tsx');
  if (fs.existsSync(pagePath)) {
    const pageContent = fs.readFileSync(pagePath, 'utf8');
    if (pageContent.includes('lazy(') && pageContent.includes('Suspense')) {
      console.log('  ✅ Lazy loading implemented');
    } else {
      console.log('  ℹ️  Lazy loading not implemented (optional for performance)');
    }
  }
};

// Check for modern browser targets
const checkBrowserTargets = () => {
  console.log('\n🌐 Browser Support:');
  
  const browserslistPath = path.join(process.cwd(), '.browserslistrc');
  if (fs.existsSync(browserslistPath)) {
    const browserslist = fs.readFileSync(browserslistPath, 'utf8');
    if (browserslist.includes('not IE 11')) {
      console.log('  ✅ Modern browser targets (no IE11)');
    } else {
      console.log('  ⚠️  Consider targeting modern browsers only');
    }
  } else {
    console.log('  ⚠️  No .browserslistrc found - consider adding modern browser targets');
  }
};

// Run all checks
checkBundleSize();
checkOptimizations();
checkBrowserTargets();

console.log('\n🎯 Performance Tips:');
console.log('  • Use "npm run analyze" to analyze bundle size');
console.log('  • Test with Lighthouse for real-world performance metrics');
console.log('  • Consider implementing service worker for caching');
console.log('  • Optimize images with next/image component');
console.log('  • Use Web Vitals to monitor performance in production\n');
