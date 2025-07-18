// src/pages/SubCategoryPage.jsx
import React, { useState } from 'react';
import SubCategoryForm from '../components/SubCategoryForm';
import SubCategoryReport from '../components/SubCategoryReport';

const SubCategoryPage = ({ categoryId }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <SubCategoryForm
        categoryId={categoryId}
        initialValues={
          selected
            ? selected
            : { subCategoryName: '', description: '' }
        }
        isEditMode={!!selected}
        onSuccess={() => setSelected(null)}
      />
      <SubCategoryReport
        categoryId={categoryId}
        onEdit={(subCat) => setSelected(subCat)}
      />
    </div>
  );
};

export default SubCategoryPage;
