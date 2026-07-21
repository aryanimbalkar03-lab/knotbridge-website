import sys

# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Nav links
content = content.replace(
    '<a href=\"#testimonials\">Wins</a>',
    '<a href=\"#why-us\">Why Us</a>'
)

# Sections
start_marker = '    <!-- ═══ PROCESS: CASE STUDY ═══ -->'
end_marker = '    <!-- ═══ ASSESSMENT ═══ -->'
start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_sections = '''    <!-- ═══ PROCESS: CASE STUDY ═══ -->
    <section id=\"process\">
        <div class=\"glow-orb orb-2\"></div>
        <div class=\"sec-inner\">
            <div class=\"sec-head rv\">
                <span class=\"tag\">— Our Process —</span>
                <h2>How We Built <em class=\"glow-text\">ALORA Bakery</em></h2>
                <p class=\"sub\">Click each phase to see exactly how we transformed a local bakery into a premium digital brand.</p>
            </div>
            <div class=\"process-cards rv\" style=\"--d:.1s\">
                <div class=\"process-card active\" data-step=\"1\">
                    <div class=\"pc-num\">01</div>
                    <h3>Deep Discovery</h3>
                    <div class=\"pc-detail\">
                        <p>We spent a full week embedded with the ALORA team — understanding their brand DNA, customer demographics, menu economics, and competitive landscape. Every design decision was backed by real data.</p>
                    </div>
                </div>
                <div class=\"process-card\" data-step=\"2\">
                    <div class=\"pc-num\">02</div>
                    <h3>Premium UX Architecture</h3>
                    <div class=\"pc-detail\">
                        <p>We designed a luxury-tier dark aesthetic with custom animations, a floating chef mascot, and an interactive product hub — engineered to make every visitor feel like they\'re walking into a high-end patisserie.</p>
                    </div>
                </div>
                <div class=\"process-card\" data-step=\"3\">
                    <div class=\"pc-num\">03</div>
                    <h3>Full-Stack Build & Optimization</h3>
                    <div class=\"pc-detail\">
                        <p>We hand-coded every pixel with GPU-accelerated animations, hardware-accelerated parallax, and aggressive image optimization — achieving sub-2-second load times on mobile without sacrificing a single visual effect.</p>
                    </div>
                </div>
                <div class=\"process-card\" data-step=\"4\">
                    <div class=\"pc-num\">04</div>
                    <h3>Launch & Results</h3>
                    <div class=\"pc-detail\">
                        <p>ALORA went live and saw a 45% conversion boost in the first month. The immersive experience turned casual browsers into loyal customers.</p>
                        <a href=\"/portfolio/alora/index.html\" target=\"_blank\" class=\"btn magnetic\" style=\"margin-top:16px\"><span>Experience ALORA Live</span><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M5 12h14M12 5l7 7-7 7\"/></svg></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ WHY US ═══ -->
    <section id=\"why-us\">
        <div class=\"glow-orb orb-3\"></div>
        <div class=\"sec-inner\">
            <div class=\"sec-head rv\">
                <span class=\"tag\">— Why Us? —</span>
                <h2>Websites That <em class=\"glow-text\">Convert</em></h2>
            </div>
            <div class=\"why-grid rv\" style=\"--d:.1s\">
                <div class=\"why-card tilt-card\">
                    <div class=\"why-icon\">✦</div>
                    <h3>More Than a Display</h3>
                    <p>We believe websites are more than a digital brochure. They should actively work for your business — 24/7, converting visitors into paying customers.</p>
                    <div class=\"b-glow\"></div>
                </div>
                <div class=\"why-card tilt-card\">
                    <div class=\"why-icon\">⚡</div>
                    <h3>More Than a Slideshow</h3>
                    <p>We believe websites can be more than a slideshow of pretty images. Every element is engineered with purpose — to guide, engage, and persuade.</p>
                    <div class=\"b-glow\"></div>
                </div>
                <div class=\"why-card tilt-card\">
                    <div class=\"why-icon\">💬</div>
                    <h3>Conversations That Convert</h3>
                    <p>We believe websites now can bring customers and business — not by just displaying, but by having a conversation with the user that converts them into a client.</p>
                    <div class=\"b-glow\"></div>
                </div>
            </div>
            <div class=\"whatsapp-cta rv\" style=\"--d:.2s\">
                <a href=\"https://wa.me/919833411578?text=Hi%20Techbridge%2C%20I%27m%20interested%20in%20your%20services.%20Let%27s%20talk!\" target=\"_blank\" class=\"wa-btn magnetic\">
                    <svg viewBox=\"0 0 24 24\" fill=\"currentColor\" width=\"24\" height=\"24\"><path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z\"/></svg>
                    <div class=\"wa-text\">
                        <strong>Chat With Us Directly</strong>
                        <span>Tap to open WhatsApp — no forms, no waiting.</span>
                    </div>
                    <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" class=\"wa-arrow\"><path d=\"M5 12h14M12 5l7 7-7 7\"/></svg>
                </a>
            </div>
        </div>
    </section>

    <!-- ═══ TESTIMONIALS: HOLOGRAPHIC DECK ═══ -->
    <section id=\"testimonials\">
        <div class=\"glow-orb orb-4\"></div>
        <div class=\"sec-inner\">
            <div class=\"sec-head rv\">
                <span class=\"tag\">— Proven Results —</span>
                <h2>Ecosystem <em class=\"glow-text\">Impact</em></h2>
                <p class=\"sub\">Click the card to see the next client win.</p>
            </div>
            <div class=\"deck-container rv\" style=\"--d:.1s\">
                <div class=\"deck-card\">
                    <div class=\"metric\"><span class=\"glow-text\">45%</span></div>
                    <p class=\"metric-label\">Increase in Conversion Rate</p>
                    <p class=\"quote\">\"Techbridge didn\'t just redesign our site — they completely re-engineered our sales funnel. The results were immediate.\"</p>
                    <div class=\"client-info\">— ALORA Bakery, Mumbai</div>
                </div>
                <div class=\"deck-card\">
                    <div class=\"metric\"><span class=\"glow-text\">3x</span></div>
                    <p class=\"metric-label\">Mobile Traffic Retention</p>
                    <p class=\"quote\">\"Our mobile bounce rate plummeted. The fluid, app-like experience they built is simply unmatched in our industry.\"</p>
                    <div class=\"client-info\">— FinTech Global, NYC</div>
                </div>
                <div class=\"deck-card\">
                    <div class=\"metric\"><span class=\"glow-text\">2.5s</span></div>
                    <p class=\"metric-label\">Faster Page Loads</p>
                    <p class=\"quote\">\"Blazing fast. The tech stack they deployed completely revolutionized our user engagement metrics.\"</p>
                    <div class=\"client-info\">— SaaS Flow, Remote</div>
                </div>
            </div>
            <div class=\"deck-controls rv\" style=\"--d:.2s\">
                <button id=\"deck-next\" class=\"btn magnetic\"><span>Next Impact</span><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M5 12h14M12 5l7 7-7 7\"/></svg></button>
            </div>
        </div>
    </section>

    <!-- ═══ FAQ: DECRYPTION TERMINAL ═══ -->
    <section id=\"faq\">
        <div class=\"glow-orb orb-1\"></div>
        <div class=\"sec-inner\">
            <div class=\"sec-head rv\">
                <span class=\"tag\">— Intelligence —</span>
                <h2>Decrypting <em class=\"glow-text\">Knotbridge</em></h2>
                <p class=\"sub\">Click any question to decrypt the answer.</p>
            </div>
            <div class=\"terminal-container rv\" style=\"--d:.1s\">
                <div class=\"terminal-line\">
                    <div class=\"terminal-prompt\">How much does a custom build cost?</div>
                    <div class=\"terminal-response\" data-encrypted=\"true\">Our premium builds start at ₹50,000, scaling with complexity and required infrastructure. We don\'t build cheap websites — we forge digital assets that generate massive ROI.</div>
                </div>
                <div class=\"terminal-line\">
                    <div class=\"terminal-prompt\">What is the typical project timeline?</div>
                    <div class=\"terminal-response\" data-encrypted=\"true\">Standard deployments launch in 4–6 weeks. Highly complex platforms with custom backend architectures may require 8–12 weeks of rigorous development.</div>
                </div>
                <div class=\"terminal-line\">
                    <div class=\"terminal-prompt\">Do you provide post-launch support?</div>
                    <div class=\"terminal-response\" data-encrypted=\"true\">Yes. We offer retainer packages for continuous optimization, A/B testing, and dedicated server maintenance to ensure your platform never depreciates.</div>
                </div>
                <div class=\"terminal-line\">
                    <div class=\"terminal-prompt\">Do you only work with large enterprises?</div>
                    <div class=\"terminal-response\" data-encrypted=\"true\">No. We partner with ambitious startups and scale-ups who are ready to dominate their market with a superior digital experience.</div>
                </div>
            </div>
        </div>
    </section>

'''
    content = content[:start_idx] + new_sections + content[end_idx:]

content = content.replace('style.css?v=4', 'style.css?v=5')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated index.html')
