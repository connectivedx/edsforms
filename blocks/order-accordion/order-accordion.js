export default async function decorate(block) {
    // Render the static filter and selected-amount UI
    block.innerHTML = `
        <div id="order-accordion">
            <div id="list-filter" class="custom-dropdown">
                <label id="filter-label">Specialty</label>
                <div id="current-selection">Women's Health</div>
                <div id="filter-options">
                    <button class="filter-option">Men's Health</button>
                    <button class="filter-option">Pediatric</button>
                </div>
            </div>
            <div class="selected-amount">
                <div><span class="selected-amount">0</span> selected</div>
                <div><button class="continue">Continue ></button></div>
            </div>
            <ul id="test-package-list">
                <!-- test-package blocks will be inserted here by Universal Editor -->
            </ul>
            <div class="selected-amount">
                <div><span class="selected-amount">0</span> selected</div>
                <div><button class="continue">Continue ></button></div>
            </div>
        </div>
    `;

    // Move any test-package blocks authored in Universal Editor into the list
    const testPackageList = block.querySelector('#test-package-list');
    // Find all child blocks with data-block-name="test-package" (these are authored in the editor)
    const authoredBlocks = Array.from(block.querySelectorAll('[data-block-name="test-package"]'));
    authoredBlocks.forEach((pkgBlock) => {
        const li = document.createElement('li');
        li.appendChild(pkgBlock);
        testPackageList.appendChild(li);
    });

    // Dynamically decorate all test-package blocks
    if (authoredBlocks.length > 0) {
        const mod = await import('../test-package/test-package.js');
        authoredBlocks.forEach((pkgBlock) => {
            if (mod && typeof mod.default === 'function') {
                mod.default(pkgBlock);
            }
        });
    }
}
