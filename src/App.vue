<template>
	<div class="flex w-screen h-screen text-gray-700">
		<div class="flex flex-col flex-shrink-0 w-64 border-r border-gray-300 bg-gray-100">

		</div>
		<div class="flex flex-col flex-grow">
			<editor-content :editor="editor"/>			
		</div>
	</div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

	export default {
		name: 'App',
		components: {
			EditorContent
		},
		data() {
			return {
				editor  : null,
				database: null,
			}
		},
		async created() {
            this.database = this.getDatabase();
		},
		mounted() {
			this.editor = new Editor({
				content: '',
				extensions: [
					StarterKit
				],
				editorProps: {
					attributes: {
						class: "prose my-6 mx-auto focus:outline-none"
					}
				}
			})
		},
		beforeUnmount() {
			this.editor.destroy();
		},
		methods: {
			async getDatabase() {
				return new Promise((resolve, reject) => {
					let db = window.indexedDB.open("notes");

					db.onerror = e => {
						reject('Error opening the database.');
					};

					db.onsuccess = e => {
                        console.log('db.onsuccess', e);
						resolve(e.target.result);
					};

					db.onupgradeneeded = e => {
                        console.log('db.onupgradeneeded', e);
						e.target.result.createObjectStore("notes");
					};
				})
			}
		}
	}
</script>