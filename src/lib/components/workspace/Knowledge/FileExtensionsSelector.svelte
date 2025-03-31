<script lang="ts">
    import { getContext } from 'svelte';
    const i18n = getContext('i18n');
    
    export let knowledge;
    export let onChange;
</script>

<div class="flex w-full px-1 mt-2">
    <label class="text-xs text-gray-500 w-full">
        {$i18n.t('File Extensions')} {$i18n.t('(comma-separated, e.g. "*.txt, *.md, *.pdf")')}
        <input
            type="text"
            class="text-left text-xs w-full text-gray-500 bg-transparent outline-hidden mt-1 border border-gray-100 dark:border-gray-800 rounded px-2 py-1"
            value={knowledge.meta?.file_extensions ? knowledge.meta.file_extensions.join(', ') : ''}
            placeholder={$i18n.t('Leave empty to allow all files')}
            on:input={(e) => {
                // Parse the comma-separated string into an array
                const extensions = e.target.value.split(',').map(ext => ext.trim()).filter(ext => ext);
                
                // Update the knowledge object
                knowledge.meta = knowledge.meta || {};
                knowledge.meta.file_extensions = extensions.length > 0 ? extensions : null;
                
                // Save the changes
                onChange();
            }}
        />
    </label>
</div>