# Storyblok CMS Integration

This website is now powered by Storyblok CMS, making all content dynamically editable through the Storyblok interface.

## Environment Setup

The following environment variables are configured in `.env`:

```env
NEXT_PUBLIC_STORYBLOK_TOKEN=your_api_token_here
NEXT_PUBLIC_STORYBLOK_VERSION=published
```

- `NEXT_PUBLIC_STORYBLOK_TOKEN`: Your Storyblok API access token
- `NEXT_PUBLIC_STORYBLOK_VERSION`: Set to `published` for production or `draft` for preview mode

## Content Structure

The website uses a **component-based** content model in Storyblok. Each page has a `body` field containing blocks/components.

### Home Page Structure

The homepage (`home` story) uses the following components in order:

#### 1. Hero Component
- **Component Name**: `hero`
- **Fields**:
  - `title` (Text): Main headline (e.g., "Where Ambition Meets Style")
  - `banner` (Asset): Hero background image

#### 2. About Component
- **Component Name**: `about`
- **Fields**:
  - `heading` (Text): Section heading
  - `description` (Textarea): About text
  - `CTA_label` (Text): Button text (e.g., "Download Moodboard")
  - `CTA_link` (Link): Button URL

#### 3. Mission & Vision Component
- **Component Name**: `mission_vision`
- **Fields**:
  - `heading` (Text): Section heading (e.g., "Our Vision & Mission")
  - `items` (Blocks): Array of `card_with_icon` components
    - Each card has:
      - `heading` (Text): Card title
      - `description` (Textarea): Card description
      - `icon` (Asset): Icon/image

#### 4. Work Component (Why Work Natty?)
- **Component Name**: `work`
- **Fields**:
  - `heading` (Text): Section heading
  - `work` (Blocks): Array of `card_with_icon` components
    - Each card has:
      - `heading` (Text): Service title
      - `description` (Textarea): Service description
      - `icon` (Asset): Service image

#### 5. Founder Component
- **Component Name**: `founder`
- **Fields**:
  - `heading` (Text): Section heading (e.g., "Founder's Note")
  - `founder_name` (Text): Founder's full name
  - `title` (Text): Founder's title (e.g., "Founder & CEO")
  - `quote` (Textarea): Founder's quote
  - `founder_photo` (Asset): Founder's photo

#### 6. Lookbook Component
- **Component Name**: `lookbook`
- **Fields**:
  - `heading` (Text): Section heading
  - `cards` (Blocks): Array of `card_with_icon` components
    - Each card has:
      - `heading` (Text): Lookbook item name
      - `icon` (Asset): Lookbook image

#### 7. Opportunity Component
- **Component Name**: `opportunity`
- **Fields**:
  - `heading` (Text): Section heading (e.g., "The Market Opportunity")
  - `description` (Textarea): Market description

#### 8. Partner Component
- **Component Name**: `partner`
- **Fields**:
  - `heading` (Text): Section heading
  - `description` (Textarea): Partnership description
  - `image` (Asset): Partner section image
  - `CTA_label` (Text): Button text
  - `CTA_link` (Link): Button URL

## Component Schema

### Reusable: card_with_icon

This is a nested component used in multiple sections:

```typescript
{
  heading: string;
  description: string;
  icon?: Asset; // Optional image/icon
}
```

## How to Edit Content

1. **Login to Storyblok**: Go to your Storyblok space
2. **Navigate to Content**: Find the "Home" story
3. **Edit Components**: Click on any component to edit its fields
4. **Add/Remove Blocks**: Use the "+" button to add new blocks or drag to reorder
5. **Publish Changes**: Click "Publish" to make changes live

## Adding New Sections

To add a new section to the homepage:

1. **Create Component in Storyblok**:
   - Go to Components > Create New Component
   - Add the required fields
   - Make it a "Nestable block"

2. **Create TypeScript Interface** in `types/storyblok.ts`:
   ```typescript
   export interface YourNewSection {
     _uid: string;
     component: "your_component_name";
     // Add your fields here
   }
   ```

3. **Create React Component** in `components/`:
   ```tsx
   export default function YourSection({ data }: { data?: YourNewSection }) {
     // Component implementation
   }
   ```

4. **Add to Page** in `app/page.tsx`:
   ```typescript
   const yourSection = story?.content.body.find(
     (section) => section.component === "your_component_name"
   );
   
   // In JSX:
   <YourSection data={yourSection} />
   ```

## Caching & Revalidation

The website revalidates content every **60 seconds** (ISR - Incremental Static Regeneration). This means:

- Changes in Storyblok appear on the live site within 60 seconds
- The site remains fast with static generation
- No manual rebuild required

To change the revalidation time, edit `app/page.tsx`:

```typescript
export const revalidate = 60; // Change to your desired seconds
```

## Draft Mode

To preview unpublished changes:

1. Change `NEXT_PUBLIC_STORYBLOK_VERSION=draft` in `.env`
2. Restart the dev server

**Note**: Only use draft mode in development. Production should use `published`.

## Troubleshooting

### Content not updating
- Check that you clicked "Publish" in Storyblok
- Wait up to 60 seconds for revalidation
- Clear your browser cache
- Verify the API token has read access

### Missing images
- Ensure images are uploaded in Storyblok
- Check that the "Return Format" is set correctly
- Verify image URLs are accessible

### Component not showing
- Check the component name matches exactly (case-sensitive)
- Verify the component is added to the story's body array
- Ensure the TypeScript interface matches the Storyblok schema
