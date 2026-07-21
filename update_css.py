import sys

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace Mobile Process in 900px
target_900 = '''  /* Mobile Process */
  .forge-container{grid-template-columns:1fr 1fr;gap:16px}
  .forge-container::after{display:none}
  .node-orb{width:50px;height:50px;font-size:18px;margin-bottom:18px}
  .node-content h3{font-size:16px}
  
  /* Mobile Deck */
  .deck-container{max-width:100%;height:420px}
  .deck-card{padding:28px}
  .deck-card .metric{font-size:42px}
  .deck-card .quote{font-size:14px}
  
  /* Mobile Terminal */
  .terminal-prompt{font-size:13px}
  .terminal-response{font-size:12px}'''

replacement_900 = '''  /* Mobile Process */
  .process-cards{flex-direction:column}
  .process-card.active{flex:1}
  
  /* Mobile Why Us */
  .why-grid{grid-template-columns:1fr}
  .wa-btn{padding:16px 24px;border-radius:16px}
  .wa-btn svg:first-child{width:26px;height:26px}
  .wa-text strong{font-size:14px}
  
  /* Mobile Deck */
  .deck-container{max-width:100%;height:420px}
  .deck-card{padding:28px}
  .deck-card .metric{font-size:42px}
  .deck-card .quote{font-size:14px}
  
  /* Mobile Terminal */
  .terminal-prompt{font-size:13px}
  .terminal-response{font-size:12px}'''

css = css.replace(target_900, replacement_900)

target_600 = '''  /* Small mobile Process */
  .forge-container{grid-template-columns:1fr}
  .forge-node{padding:28px 22px}'''

replacement_600 = '''  /* Small mobile */
  .process-card{padding:24px 20px}
  .process-card .pc-num{font-size:36px}'''

css = css.replace(target_600, replacement_600)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Updated style.css')
