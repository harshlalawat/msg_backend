module.exports = {
    tableName: 'users',
    columnName: {
        'id': 'id',
        'displayname': 'displayname',
        'email': 'email',
        'role': 'role',
        'password': 'password',
        'profilePic': 'profile_pic',
        'varification_token': 'varification_token',
        'password_reset_token': 'password_reset_token',
        'password_reset_token_valid_upto_date': 'password_reset_token_valid_upto_date',
        'workspace_ids': 'workspace_ids',
        'channel_ids': 'channel_ids',
        'last_active_workspace_id': 'last_active_workspace_id',
        'last_active_channel_id': 'last_active_channel_id',
        'created_at' : 'created_at', 
        'updated_at' : 'updated_at',
        'deleted_at': 'deleted_at',
        'deleted_by': 'deleted_by',
        'last_notification_seen': 'last_notification_seen',
    }
}