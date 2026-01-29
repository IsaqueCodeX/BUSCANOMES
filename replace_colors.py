
import re
import os

file_path = "c:/Users/USER_PC/Downloads/buscanomes---descubra-o-nome-perfeito/App.tsx"

# Check if file exists to avoid errors
if not os.path.exists(file_path):
    print(f"Error: {file_path} not found.")
    exit(1)

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Backgrounds (Solid) -> Gradient Class
# Note: We must be careful not to replace 'bg-orange-50' or 'bg-orange-100'
content = regex_bg_500 = re.sub(r'bg-orange-500', 'bg-brand-gradient', content)
content = regex_bg_600 = re.sub(r'bg-orange-600', 'bg-brand-gradient', content)

# 2. Hovers (Background) -> Gradient Class Hover
# We defined .hover-bg-brand-gradient in index.css
content = re.sub(r'hover:bg-orange-500', 'hover-bg-brand-gradient', content)
content = re.sub(r'hover:bg-orange-600', 'hover-bg-brand-gradient', content)

# 3. Existing Gradients (Manual) -> Gradient Class
# e.g. from-orange-600 to-amber-600
content = re.sub(r'bg-gradient-to-r from-orange-600 to-amber-600', 'bg-brand-gradient', content)
# We leave the light gradients (orange-50) alone as they are backgrounds

# 4. Text -> Solid #fc4a1a (Use the strong end of gradient)
# Text gradients can be tricky, so we use the solid brand color for text to ensure readability
content = re.sub(r'text-orange-500', 'text-[#fc4a1a]', content)
content = re.sub(r'text-orange-600', 'text-[#fc4a1a]', content)
content = re.sub(r'hover:text-orange-500', 'hover:text-[#fc4a1a]', content)
content = re.sub(r'hover:text-orange-600', 'hover:text-[#fc4a1a]', content)

# 5. Borders -> Solid #fc4a1a
content = re.sub(r'border-orange-500', 'border-[#fc4a1a]', content)
content = re.sub(r'border-orange-600', 'border-[#fc4a1a]', content)
content = re.sub(r'hover:border-orange-200', 'hover:border-[#f7b733]', content) # Lighter start of gradient

# 6. Fill/Stroke (Icons)
content = re.sub(r'fill-orange-600', 'fill-[#fc4a1a]', content)
content = re.sub(r'stroke-orange-600', 'stroke-[#fc4a1a]', content)

# 7. Shadows
content = re.sub(r'shadow-orange-500/30', 'shadow-[#fc4a1a]/30', content)
content = re.sub(r'shadow-orange-500/20', 'shadow-[#fc4a1a]/20', content)
content = re.sub(r'shadow-orange-500/5', 'shadow-[#fc4a1a]/5', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully replaced orange colors with brand gradient values.")
